import React from 'react';

export interface IProps extends React.HTMLAttributes<HTMLSpanElement> {
  value?: string;
  hidePlaceholder?: boolean;
}

const PlainText = React.forwardRef<any, IProps>((props, ref) => {
  const { value, hidePlaceholder = false, placeholder = '-', ...spanProps } = props;

  return (
    <span ref={ref} {...spanProps}>
      {value || (!hidePlaceholder && placeholder)}
    </span>
  );
});

export default PlainText;
