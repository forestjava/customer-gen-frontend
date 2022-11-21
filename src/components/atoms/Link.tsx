import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

import cn from '../../utils/classnames';

export type LinkProps = RouterLinkProps & {
  variant?: string;
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant, className, children, ...props }, ref) => (
    <RouterLink ref={ref} className={cn(variant && 'link', variant, className)} {...props}>
      {children}
    </RouterLink>
  ),
);
