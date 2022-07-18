import { Form } from 'antd';
export { Form } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useController } from 'react-hook-form';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

const isDEV = () => {
    var _a, _b;
    // @ts-ignore
    if (!((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV))
        return false;
    // @ts-ignore
    if (['development', 'dev'].includes((_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b.NODE_ENV))
        return true;
    return false;
};
const isFalsy = (value) => {
    if (value === null)
        return true;
    if (value === undefined)
        return true;
    if (value === false)
        return true;
    return false;
};
const warning = (isTruthy, ...params) => {
    if (isDEV() && isTruthy) {
        console.warn(...params);
    }
};

// 如果直接赋值给 FormItem, 会导致 FormItem 里头 labelCol in props 的逻辑判断为 true， 从而使设置的布局未生效
const getLayoutProps = ({ labelAlign, labelCol, wrapperCol }) => {
    const layoutProps = {};
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
const getRules = (rules, options) => {
    let newRules = Object.assign({}, rules);
    if (options === null || options === void 0 ? void 0 : options.required) {
        if (typeof (options === null || options === void 0 ? void 0 : options.required) === 'string') {
            newRules.required = options.required;
        }
        else {
            newRules.required = `${options === null || options === void 0 ? void 0 : options.label}不能为空`;
        }
    }
    return newRules;
};
const getValidateStatus = (fieldState) => {
    let validateStatus = '';
    if (fieldState === null || fieldState === void 0 ? void 0 : fieldState.error) {
        validateStatus = 'error';
    }
    if (fieldState.isDirty && !(fieldState === null || fieldState === void 0 ? void 0 : fieldState.error)) {
        validateStatus = 'success';
    }
    return validateStatus;
};
const getHelpMessage = (fieldState) => {
    var _a;
    return (_a = fieldState === null || fieldState === void 0 ? void 0 : fieldState.error) === null || _a === void 0 ? void 0 : _a.message;
};
const getPlaceholder = ({ metadata, componentType, labelText, }) => {
    if (!isFalsy(metadata === null || metadata === void 0 ? void 0 : metadata.props.placeholder))
        return metadata === null || metadata === void 0 ? void 0 : metadata.props.placeholder;
    if (componentType === 'select') {
        return `请选择${labelText}`;
    }
    return `请输入${labelText}`;
};
const InternalFormItem = (props) => {
    const { name, control, defaultValue, label, labelText = label, labelCol, wrapperCol, labelAlign, rules = {}, required, hasFeedback, style, valuePropName = 'value', trigger = 'onChange', getValueFromEvent } = props, antdProps = __rest(props, ["name", "control", "defaultValue", "label", "labelText", "labelCol", "wrapperCol", "labelAlign", "rules", "required", "hasFeedback", "style", "valuePropName", "trigger", "getValueFromEvent"]);
    /**
     * 为了解决在生产环境无法正确判断children的组件名称这个问题，
     * 改用判断formitem下的DOM节点是否包含了特定的classname，
     * 这边要注意不应该去设置 children的 ref，因为外部可能还会设置ref属性，所以这边通过设置 formitem 的 ref
     */
    const formItemRef = useRef();
    const [childrenComponentType, setChildrenComponentType] = useState('');
    const layoutProps = getLayoutProps({ labelCol, wrapperCol, labelAlign });
    const isRequired = required || Object.keys(rules).includes('required');
    const rulesProp = getRules(rules, { required, label: labelText });
    warning(React.isValidElement(label) && typeof labelText !== 'string', 'label 被设置为 ReactElement, 请正确设置 labelText 为[纯文本 string]以保证校验提示本文的正确性');
    useEffect(() => {
        const dom = ReactDOM.findDOMNode(formItemRef.current);
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
    });
    const validateStatus = getValidateStatus(fieldState);
    const help = getHelpMessage(fieldState);
    const placeholder = getPlaceholder({
        metadata: props.children,
        componentType: childrenComponentType,
        labelText: labelText,
    });
    const proxyProps = {
        [valuePropName]: field.value,
        [trigger](event) {
            var _a, _b;
            let value = event;
            if (getValueFromEvent) {
                value = getValueFromEvent(event);
            }
            field.onChange(value);
            // @ts-expect-error
            if ((_b = (_a = props.children) === null || _a === void 0 ? void 0 : _a.props) === null || _b === void 0 ? void 0 : _b[trigger]) {
                // @ts-expect-error
                props.children.props[trigger](...arguments);
            }
        },
    };
    return (React.createElement(Form.Item, Object.assign({}, antdProps, { label: label, required: isRequired, validateStatus: validateStatus, help: help, hasFeedback: hasFeedback }, layoutProps, { style: style, ref: formItemRef }), React.cloneElement(props.children, Object.assign(Object.assign(Object.assign({}, field), proxyProps), { placeholder }))));
};
const PureFormItem = Form.Item;

const PlainText = React.forwardRef((props, ref) => {
    const { value, hidePlaceholder = false, placeholder = '-' } = props, spanProps = __rest(props, ["value", "hidePlaceholder", "placeholder"]);
    return (React.createElement("span", Object.assign({ ref: ref }, spanProps), value || (!hidePlaceholder && placeholder)));
});

export { InternalFormItem as FormItem, PlainText, PureFormItem };
