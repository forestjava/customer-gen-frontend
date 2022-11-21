import React from 'react';

import cn from '../../utils/classnames';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: string;
  className?: string;
  value?: any;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant, className, children, ...props }, ref) => (
    <input ref={ref} className={cn(variant && 'input', variant, className)} {...props} />
  ),
);
