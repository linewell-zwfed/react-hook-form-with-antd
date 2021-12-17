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

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  var _i =
    arr == null
      ? null
      : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) || arr['@@iterator'];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

import React, { useState } from 'react';
import { Input, Radio, Select, Table, Button } from 'antd';
import { useForm, useFieldArray } from 'react-hook-form'; // @ts-ignore

import { Form, FormItem, PureFormItem } from 'react-hook-form-with-antd';
var formItemLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 21,
  },
};

var Demo = function Demo() {
  var _useState = useState({}),
    _useState2 = _slicedToArray(_useState, 2),
    formValue = _useState2[0],
    setFormValue = _useState2[1];

  var _useForm = useForm({
      mode: 'onChange',
    }),
    control = _useForm.control,
    handleSubmit = _useForm.handleSubmit;

  var _useFieldArray = useFieldArray({
      name: 'componentParams',
      control: control,
    }),
    fields = _useFieldArray.fields,
    append = _useFieldArray.append,
    remove = _useFieldArray.remove;

  return /*#__PURE__*/ React.createElement(
    'div',
    null,
    /*#__PURE__*/ React.createElement(
      Form,
      _objectSpread({}, formItemLayout),
      /*#__PURE__*/ React.createElement(
        FormItem,
        {
          label: '\u7EC4\u4EF6\u540D\u79F0',
          name: 'componentName',
          control: control,
          required: true,
        },
        /*#__PURE__*/ React.createElement(Input, null),
      ),
      /*#__PURE__*/ React.createElement(
        FormItem,
        {
          label: '\u7EC4\u4EF6\u7C7B\u578B',
          name: 'componentType',
          control: control,
          required: true,
        },
        /*#__PURE__*/ React.createElement(Radio.Group, {
          options: [
            {
              label: 'restful',
              value: 'restful',
            },
            {
              label: 'webservice',
              value: 'webservice',
            },
            {
              label: '页面',
              value: '页面',
            },
          ],
        }),
      ),
      /*#__PURE__*/ React.createElement(
        FormItem,
        {
          label: '\u8C03\u7528\u5730\u5740',
          name: 'address',
          control: control,
          required: true,
        },
        /*#__PURE__*/ React.createElement(Input, null),
      ),
      /*#__PURE__*/ React.createElement(
        FormItem,
        {
          label: '\u8C03\u7528\u65B9\u5F0F',
          name: 'method',
          control: control,
          required: true,
        },
        /*#__PURE__*/ React.createElement(
          Select,
          null,
          /*#__PURE__*/ React.createElement(
            Select.Option,
            {
              value: 'GET',
            },
            'GET',
          ),
          /*#__PURE__*/ React.createElement(
            Select.Option,
            {
              value: 'POST',
            },
            'POST',
          ),
        ),
      ),
      /*#__PURE__*/ React.createElement(
        PureFormItem,
        {
          label: '\u53C2\u6570\u5217\u8868',
        },
        /*#__PURE__*/ React.createElement(
          Table,
          {
            bordered: true,
            dataSource: fields,
            pagination: false,
            size: 'middle',
            rowKey: 'id',
          },
          /*#__PURE__*/ React.createElement(Table.Column, {
            title: '\u53C2\u6570\u540D\u79F0',
            key: 'name',
            render: function render(_, __, index) {
              return /*#__PURE__*/ React.createElement(
                FormItem,
                {
                  labelText: '\u53C2\u6570\u540D\u79F0',
                  name: 'componentParams.'.concat(index, '.name'),
                  control: control,
                  required: true,
                  style: {
                    marginBottom: 0,
                  },
                },
                /*#__PURE__*/ React.createElement(Input, null),
              );
            },
          }),
          /*#__PURE__*/ React.createElement(Table.Column, {
            title: '\u53C2\u6570\u8BF4\u660E',
            key: 'memo',
            render: function render(_, __, index) {
              return /*#__PURE__*/ React.createElement(
                FormItem,
                {
                  labelText: '\u53C2\u6570\u8BF4\u660E',
                  name: 'componentParams.'.concat(index, '.memo'),
                  control: control,
                  required: true,
                  style: {
                    marginBottom: 0,
                  },
                },
                /*#__PURE__*/ React.createElement(Input, null),
              );
            },
          }),
          /*#__PURE__*/ React.createElement(Table.Column, {
            title: '\u6570\u636E\u7C7B\u578B',
            key: 'type',
            width: 120,
            render: function render(_, __, index) {
              return /*#__PURE__*/ React.createElement(
                FormItem,
                {
                  labelText: '\u6570\u636E\u7C7B\u578B',
                  name: 'componentParams.'.concat(index, '.type'),
                  control: control,
                  required: true,
                  style: {
                    marginBottom: 0,
                  },
                },
                /*#__PURE__*/ React.createElement(
                  Select,
                  null,
                  /*#__PURE__*/ React.createElement(
                    Select.Option,
                    {
                      value: 'Int',
                    },
                    'Int',
                  ),
                  /*#__PURE__*/ React.createElement(
                    Select.Option,
                    {
                      value: 'Float',
                    },
                    'Float',
                  ),
                  /*#__PURE__*/ React.createElement(
                    Select.Option,
                    {
                      value: 'Long',
                    },
                    'Long',
                  ),
                  /*#__PURE__*/ React.createElement(
                    Select.Option,
                    {
                      value: 'String',
                    },
                    'String',
                  ),
                  /*#__PURE__*/ React.createElement(
                    Select.Option,
                    {
                      value: 'Date',
                    },
                    'Date',
                  ),
                ),
              );
            },
          }),
          /*#__PURE__*/ React.createElement(Table.Column, {
            title: '\u9ED8\u8BA4\u503C',
            key: 'defaultValue',
            render: function render(_, __, index) {
              return /*#__PURE__*/ React.createElement(
                FormItem,
                {
                  labelText: '\u9ED8\u8BA4\u503C',
                  name: 'componentParams.'.concat(index, '.defaultValue'),
                  control: control,
                  required: true,
                  style: {
                    marginBottom: 0,
                  },
                },
                /*#__PURE__*/ React.createElement(Input, null),
              );
            },
          }),
          /*#__PURE__*/ React.createElement(Table.Column, {
            title: '\u64CD\u4F5C',
            key: 'action',
            width: 60,
            align: 'center',
            render: function render(_, __, index) {
              return /*#__PURE__*/ React.createElement(
                'a',
                {
                  style: {
                    color: 'red',
                  },
                  onClick: function onClick() {
                    return remove(index);
                  },
                },
                '\u5220\u9664',
              );
            },
          }),
        ),
        /*#__PURE__*/ React.createElement(
          Button,
          {
            type: 'primary',
            onClick: function onClick() {
              return append({
                name: '',
                memo: '',
                type: 'Int',
                defaultValue: '',
              });
            },
          },
          '\u65B0\u589E',
        ),
      ),
      /*#__PURE__*/ React.createElement(
        FormItem,
        {
          label: '\u8FD4\u56DE\u6570\u636E\u7C7B\u578B',
          name: 'responseType',
          control: control,
          required: true,
        },
        /*#__PURE__*/ React.createElement(Radio.Group, {
          options: [
            {
              label: 'json',
              value: 'json',
            },
            {
              label: 'xml',
              value: 'xml',
            },
            {
              label: 'text',
              value: 'text',
            },
          ],
        }),
      ),
      /*#__PURE__*/ React.createElement(
        PureFormItem,
        {
          wrapperCol: {
            span: 21,
            offset: 3,
          },
        },
        /*#__PURE__*/ React.createElement(
          'p',
          null,
          '\u8868\u5355\u503C: ',
          JSON.stringify(formValue),
        ),
        /*#__PURE__*/ React.createElement(
          Button,
          {
            onClick: handleSubmit(function (data) {
              return setFormValue(data);
            }),
          },
          '\u83B7\u53D6\u8868\u5355\u503C',
        ),
      ),
    ),
  );
};

export default Demo;
