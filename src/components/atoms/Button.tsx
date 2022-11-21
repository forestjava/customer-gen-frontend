import React from 'react';

import cn from '../../utils/classnames';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  type?: 'button' | 'submit' | 'reset';
  variant?: string;
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
  icon?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type = 'button', variant, className, children, icon, iconLeft, iconRight, ...props }, ref) => (
    <button ref={ref} type={type} className={cn(variant && 'button', variant, className)} {...props}>
      {iconLeft}
      {icon}
      {children}
      {iconRight}
    </button>
  ),
);
