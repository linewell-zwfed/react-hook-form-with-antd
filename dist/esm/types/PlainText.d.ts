import React from 'react';
export interface IProps extends React.HTMLAttributes<HTMLSpanElement> {
    value?: string;
    hidePlaceholder?: boolean;
}
declare const PlainText: React.ForwardRefExoticComponent<IProps & React.RefAttributes<any>>;
export default PlainText;
