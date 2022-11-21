import React from 'react';

import cn from '../../utils/classnames';

export type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | React.FunctionComponent;
  variant?: string;
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
};

export const Heading: React.FC<HeadingProps> = ({ as, variant, className, children }) => {
  const Tag = as || 'h2';
  return <Tag className={cn(variant && 'heading', variant, className)}>{children}</Tag>;
};
