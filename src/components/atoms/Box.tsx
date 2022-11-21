import React from 'react';

import cn from '../../utils/classnames';

export type BoxProps = {
  as?: keyof JSX.IntrinsicElements | React.FunctionComponent;
  variant?: string;
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
};

export const Box: React.FC<BoxProps> = ({ as, variant, className, children }) => {
  const Tag = as || 'div';
  return <Tag className={cn(variant && 'box', variant, className)}>{children}</Tag>;
};
