import React from 'react';
import { ControllerProps } from 'react-hook-form';
import { FormItemProps } from 'antd/es/form';
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
declare const InternalFormItem: React.FC<HooksFormItemProps>;
export declare const PureFormItem: typeof import("antd/lib/form/FormItem").default;
export default InternalFormItem;
