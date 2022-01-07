import React from 'react';

export interface IProps extends React.HTMLAttributes<HTMLSpanElement> {
  value?: string;
}

const PlainText = React.forwardRef<any, IProps>((props, ref) => {
  const { value, ...spanProps } = props;

  return (
    <span ref={ref} {...spanProps}>
      {value}
    </span>
  );
});

export default PlainText;
