import React from 'react';
import { Form } from 'antd';
import { useController, ControllerProps, ControllerFieldState } from 'react-hook-form';

import { FormItemProps } from 'antd/es/form';

import { isFalsy, warning } from './utils';

export interface HooksFormItemProps extends FormItemProps {
  name: ControllerProps['name'];
  control: ControllerProps<any>['control'];
  rules?: ControllerProps['rules'];
  labelText?: string;
  defaultValue?: ControllerProps['defaultValue'];
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

const getRules = (
  rules: ControllerProps['rules'],
  options: { required?: boolean | string; label: string },
) => {
  let newRules = { ...rules };

  if (options?.required) {
    if (typeof options?.required === 'string') {
      newRules.required = options.required;
    } else {
      newRules.required = `${options?.label}不能为空`;
    }
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
  labelText,
}: {
  metadata: React.ReactElement;
  labelText: string;
}) => {
  if (!isFalsy(metadata?.props.placeholder)) return metadata?.props.placeholder;

  if (typeof metadata?.type === 'function' && ['select', 'Select'].includes(metadata?.type?.name)) {
    return `请选择${labelText}`;
  }

  return `请输入${labelText}`;
};

const InternalFormItem: React.FC<HooksFormItemProps> = (props) => {
  const {
    name,
    control,
    defaultValue,
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
  } = props;

  const layoutProps = getLayoutProps({ labelCol, wrapperCol, labelAlign });

  const isRequired = required || Object.keys(rules).includes('required');
  const rulesProp = getRules(rules, { required, label: labelText as string });

  warning(
    React.isValidElement(label) && typeof labelText !== 'string',
    'label 被设置为 ReactElement, 请正确设置 labelText 为[纯文本 string]以保证校验提示本文的正确性',
  );

  const { field, fieldState } = useController({
    name,
    control,
    rules: rulesProp,
    defaultValue,
  });

  const validateStatus = getValidateStatus(fieldState);
  const help = getHelpMessage(fieldState);
  const placeholder = getPlaceholder({
    metadata: props.children as React.ReactElement,
    labelText: labelText as string,
  });

  const proxyProps = {
    [valuePropName]: field.value,
    [trigger]: (event: any) => {
      let value = event;

      if (getValueFromEvent) {
        value = getValueFromEvent(event);
      }

      field.onChange(value);
    },
  };

  return (
    <Form.Item
      label={label}
      required={isRequired}
      validateStatus={validateStatus}
      help={help}
      hasFeedback={hasFeedback}
      {...layoutProps}
      style={style}
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
