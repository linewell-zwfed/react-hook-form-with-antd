import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Form } from 'antd';
import { useController, ControllerProps, ControllerFieldState } from 'react-hook-form';

import { FormItemProps } from 'antd/es/form';

import { isFalsy, warning } from './utils';

type ChildrenComponentType = 'select' | 'input' | '';

type CustomRules = ControllerProps['rules'] & { whitespace?: boolean };

const RULES_WHITESPACE = 'whitespace';

function createWhitepsaceValidate(label: string) {
  return function whitepsaceValidate(val: any) {
    if (typeof val === 'string' && val.trim() === '') return `${label || '内容'}不能为空`;
    return true;
  };
}

export interface HooksFormItemProps extends FormItemProps {
  name: ControllerProps['name'];
  control: ControllerProps<any>['control'];
  rules?: CustomRules;
  labelText?: string;
  defaultValue?: ControllerProps['defaultValue'];
  shouldUnregister?: ControllerProps['shouldUnregister'];
  valuePropName?: string;
  trigger?: string;
  getValueFromEvent?: (event: any) => any;
}

// 如果直接赋值给 FormItem, 会导致 FormItem 里头 labelCol in props 的逻辑判断为 true， 从而使设置的布局未生效
const getLayoutProps = ({ labelAlign, labelCol, wrapperCol }: any) => {
  const layoutProps: any = {};

  if (labelAlign) {
    layoutProps['labelAlign'] = labelAlign;
  }

  if (labelCol) {
    layoutProps['labelCol'] = labelCol;
  }

  if (wrapperCol) {
    layoutProps['wrapperCol'] = wrapperCol;
  }

  return layoutProps;
};

const getRules = (rules: CustomRules, options: { required?: boolean | string; label: string }) => {
  let newRules = { ...rules };

  let isWhitespace = rules?.whitespace ?? true;

  if (typeof rules.validate === 'function') {
    newRules.validate = {
      defaultValidate: rules.validate,
    };
  } else if (typeof rules.validate === 'object' && Object.keys(rules.validate).length) {
    warning(
      Object.keys(rules.validate).findIndex((key) => key === RULES_WHITESPACE) > -1,
      '发现您设置了validate.whitespace 校验器，跟内置的 whitespace 有冲突，请更换该校验器名称',
    );
  } else {
    newRules.validate = {};
  }

  // 判断用户是否单独设置了 rules.required
  // 判断用户是否设置了 whitespace
  if (typeof rules?.required === 'undefined') {
    if (options?.required) {
      newRules.required = `${options?.label}不能为空`;

      if (isWhitespace) {
        // @ts-ignore
        newRules.validate['whitepsace'] = createWhitepsaceValidate(options?.label);
      }
    }
  } else if (isWhitespace) {
    // @ts-ignore
    newRules.validate['whitepsace'] = createWhitepsaceValidate(options?.label);
  }

  return newRules;
};

const getValidateStatus = (fieldState: ControllerFieldState) => {
  let validateStatus: FormItemProps['validateStatus'] = '';

  if (fieldState?.error) {
    validateStatus = 'error';
  }

  if (fieldState.isDirty && !fieldState?.error) {
    validateStatus = 'success';
  }

  return validateStatus;
};

const getHelpMessage = (fieldState: ControllerFieldState) => {
  return fieldState?.error?.message;
};

const getPlaceholder = ({
  metadata,
  componentType,
  labelText,
}: {
  metadata: React.ReactElement;
  componentType: ChildrenComponentType;
  labelText: string;
}) => {
  if (!isFalsy(metadata?.props.placeholder)) return metadata?.props.placeholder;

  if (componentType === 'select') {
    return `请选择${labelText}`;
  }

  return `请输入${labelText}`;
};

const InternalFormItem: React.FC<HooksFormItemProps> = (props) => {
  const {
    name,
    control,
    defaultValue,
    shouldUnregister = false,
    label,
    labelText = label,
    labelCol,
    wrapperCol,
    labelAlign,
    rules = {},
    required,
    hasFeedback,
    style,
    valuePropName = 'value',
    trigger = 'onChange',
    getValueFromEvent,
    ...antdProps
  } = props;

  /**
   * 为了解决在生产环境无法正确判断children的组件名称这个问题，
   * 改用判断formitem下的DOM节点是否包含了特定的classname，
   * 这边要注意不应该去设置 children的 ref，因为外部可能还会设置ref属性，所以这边通过设置 formitem 的 ref
   */
  const formItemRef = useRef();
  const [childrenComponentType, setChildrenComponentType] = useState<ChildrenComponentType>('');

  const layoutProps = getLayoutProps({ labelCol, wrapperCol, labelAlign });

  const isRequired = required || Object.keys(rules).includes('required');
  const rulesProp = getRules(rules, { required, label: labelText as string });

  warning(
    React.isValidElement(label) && typeof labelText !== 'string',
    'label 被设置为 ReactElement, 请正确设置 labelText 为[纯文本 string]以保证校验提示本文的正确性',
  );

  useEffect(() => {
    const dom = ReactDOM.findDOMNode(formItemRef.current) as Element;
    const selectNodelist = dom.querySelectorAll('.ant-select');

    switch (true) {
      case selectNodelist.length > 0:
        setChildrenComponentType('select');
        break;

      default:
        setChildrenComponentType('');
        break;
    }
  }, []);

  const { field, fieldState } = useController({
    name,
    control,
    rules: rulesProp,
    defaultValue,
    shouldUnregister,
  });

  const validateStatus = getValidateStatus(fieldState);
  const help = getHelpMessage(fieldState);
  const placeholder = getPlaceholder({
    metadata: props.children as React.ReactElement,
    componentType: childrenComponentType,
    labelText: labelText as string,
  });

  const proxyProps = {
    [valuePropName]: field.value,
    [trigger](event: any) {
      let value = event;

      if (getValueFromEvent) {
        value = getValueFromEvent(event);
      }

      field.onChange(value);

      // @ts-expect-error
      if (props.children?.props?.[trigger]) {
        // @ts-expect-error
        props.children!.props[trigger](...arguments);
      }
    },
  };

  return (
    <Form.Item
      {...antdProps}
      label={label}
      required={isRequired}
      validateStatus={validateStatus}
      help={help}
      hasFeedback={hasFeedback}
      {...layoutProps}
      style={style}
      ref={formItemRef}
    >
      {React.cloneElement(props.children as React.ReactElement, {
        ...field,
        ...proxyProps,
        placeholder,
      })}
    </Form.Item>
  );
};

export const PureFormItem = Form.Item;

export default InternalFormItem;
