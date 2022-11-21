import React from 'react';

import cn from '../../utils/classnames';

export type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  variant?: string;
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
};

export const Form = React.forwardRef<HTMLFormElement, FormProps>(({ variant, className, children, ...props }, ref) => (
  <form ref={ref} className={cn(variant && 'form', variant, className)} {...props}>
    {children}
  </form>
));
