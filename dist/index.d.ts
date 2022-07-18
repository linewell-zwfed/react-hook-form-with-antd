export { Form } from 'antd';
import * as antd_lib_form_FormItem from 'antd/lib/form/FormItem';
import React from 'react';
import { ControllerProps } from 'react-hook-form';
import { FormItemProps } from 'antd/es/form';

interface HooksFormItemProps extends FormItemProps {
    name: ControllerProps['name'];
    control: ControllerProps<any>['control'];
    rules?: ControllerProps['rules'];
    labelText?: string;
    defaultValue?: ControllerProps['defaultValue'];
    valuePropName?: string;
    trigger?: string;
    getValueFromEvent?: (event: any) => any;
}
declare const InternalFormItem: React.FC<HooksFormItemProps>;
declare const PureFormItem: typeof antd_lib_form_FormItem.default;

interface IProps extends React.HTMLAttributes<HTMLSpanElement> {
    value?: string;
    hidePlaceholder?: boolean;
}
declare const PlainText: React.ForwardRefExoticComponent<IProps & React.RefAttributes<any>>;

export { InternalFormItem as FormItem, PlainText, PureFormItem };
