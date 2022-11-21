import React from 'react';

import cn from '../../utils/classnames';
import { Box } from './Box';

export type TableProps = React.TableHTMLAttributes<HTMLTableElement> & {
  variant?: string;
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
};

export const Table: React.FC<TableProps> = ({ variant, className, children }) => (
  <Box className={cn(variant && 'table', variant, className)}>
    <table className='w-full'>{children}</table>
  </Box>
);
