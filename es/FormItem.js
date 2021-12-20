function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

import React from 'react';
import { Form } from 'antd';
import { useController } from 'react-hook-form'; // 如果直接赋值给 FormItem, 会导致 FormItem 里头 labelCol in props 的逻辑判断为 true， 从而使设置的布局未生效

var getLayoutProps = function getLayoutProps(_ref) {
  var labelAlign = _ref.labelAlign,
    labelCol = _ref.labelCol,
    wrapperCol = _ref.wrapperCol;
  var layoutProps = {};

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

var getRules = function getRules(rules, options) {
  var newRules = _objectSpread({}, rules);

  if (options === null || options === void 0 ? void 0 : options.required) {
    if (typeof (options === null || options === void 0 ? void 0 : options.required) === 'string') {
      newRules.required = options.required;
    } else {
      newRules.required = ''.concat(
        options === null || options === void 0 ? void 0 : options.label,
        '\u4E0D\u80FD\u4E3A\u7A7A',
      );
    }
  }

  return newRules;
};

var getValidateStatus = function getValidateStatus(fieldState) {
  var validateStatus = '';

  if (fieldState === null || fieldState === void 0 ? void 0 : fieldState.error) {
    validateStatus = 'error';
  }

  if (
    fieldState.isDirty &&
    !(fieldState === null || fieldState === void 0 ? void 0 : fieldState.error)
  ) {
    validateStatus = 'success';
  }

  return validateStatus;
};

var getHelpMessage = function getHelpMessage(fieldState) {
  var _fieldState$error;

  return fieldState === null || fieldState === void 0
    ? void 0
    : (_fieldState$error = fieldState.error) === null || _fieldState$error === void 0
    ? void 0
    : _fieldState$error.message;
};

var getPlaceholder = function getPlaceholder(_ref2) {
  var _metadata$type;

  var metadata = _ref2.metadata,
    labelText = _ref2.labelText;
  if (metadata === null || metadata === void 0 ? void 0 : metadata.props.placeholder)
    return metadata === null || metadata === void 0 ? void 0 : metadata.props.placeholder;

  if (
    typeof (metadata === null || metadata === void 0 ? void 0 : metadata.type) === 'function' &&
    ['select', 'Select'].includes(
      metadata === null || metadata === void 0
        ? void 0
        : (_metadata$type = metadata.type) === null || _metadata$type === void 0
        ? void 0
        : _metadata$type.name,
    )
  ) {
    return '\u8BF7\u9009\u62E9'.concat(labelText);
  }

  return '\u8BF7\u8F93\u5165'.concat(labelText);
};

var InternalFormItem = function InternalFormItem(props) {
  var name = props.name,
    control = props.control,
    defaultValue = props.defaultValue,
    label = props.label,
    _props$labelText = props.labelText,
    labelText = _props$labelText === void 0 ? label : _props$labelText,
    labelCol = props.labelCol,
    wrapperCol = props.wrapperCol,
    labelAlign = props.labelAlign,
    _props$rules = props.rules,
    rules = _props$rules === void 0 ? {} : _props$rules,
    required = props.required,
    hasFeedback = props.hasFeedback,
    style = props.style;
  var layoutProps = getLayoutProps({
    labelCol: labelCol,
    wrapperCol: wrapperCol,
    labelAlign: labelAlign,
  });
  var isRequired = required || Object.keys(rules).includes('required');
  var rulesProp = getRules(rules, {
    required: required,
    label: labelText,
  });

  if (/*#__PURE__*/ React.isValidElement(label)) {
    console.warn('label 被设置为 ReactElement, 请另外设置 labelText 以保证校验提示本文的正确性');
  }

  var _useController = useController({
      name: name,
      control: control,
      rules: rulesProp,
      defaultValue: defaultValue,
    }),
    field = _useController.field,
    fieldState = _useController.fieldState;

  var validateStatus = getValidateStatus(fieldState);
  var help = getHelpMessage(fieldState);
  var placeholder = getPlaceholder({
    metadata: props.children,
    labelText: labelText,
  });
  return /*#__PURE__*/ React.createElement(
    Form.Item,
    _objectSpread(
      _objectSpread(
        {
          label: label,
          required: isRequired,
          validateStatus: validateStatus,
          help: help,
          hasFeedback: hasFeedback,
        },
        layoutProps,
      ),
      {},
      {
        style: style,
      },
    ),
    /*#__PURE__*/ React.cloneElement(
      props.children,
      _objectSpread(
        _objectSpread({}, field),
        {},
        {
          placeholder: placeholder,
        },
      ),
    ),
  );
};

export var PureFormItem = Form.Item;
export default InternalFormItem;
