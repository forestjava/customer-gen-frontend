import React from 'react';
import { NavLink as RouterLink, NavLinkProps as RouterLinkProps } from 'react-router-dom';

import cn from '../../utils/classnames';

export type LinkProps = RouterLinkProps & {
  variant?: string;
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
};

export const NavLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant, className, children, ...props }, ref) => (
    <RouterLink
      ref={ref}
      className={({ isActive }) => cn(variant && 'link', variant, isActive && 'active', className)}
      {...props}
    >
      {children}
    </RouterLink>
  ),
);
