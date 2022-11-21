import React from 'react';
import { Box } from '../atoms/Box';
import { Input, InputProps } from '../atoms/Input';

type Props = InputProps & {
  label: string;
  value?: number;
  onChangeValue?: (value: number) => void;
};

export const InputNumber = React.forwardRef<HTMLInputElement, Props>(
  ({ label, value, onChangeValue, ...props }, ref) => (
    <Box variant='label-input'>
      <label>{label}</label>
      <Input
        variant='self'
        ref={ref}
        {...props}
        type='number'
        value={value ?? 0}
        onChange={(evt) => onChangeValue && onChangeValue(Number(evt.target.value))}
      />
    </Box>
  ),
);
