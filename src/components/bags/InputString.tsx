import React from 'react';
import { Box } from '../atoms/Box';
import { Input, InputProps } from '../atoms/Input';

type Props = InputProps & {
  label: string;
  value?: string;
  onChangeValue?: (value: string) => void;
};

export const InputString = React.forwardRef<HTMLInputElement, Props>(
  ({ label, value, onChangeValue, ...props }, ref) => (
    <Box variant='label-input'>
      <label>{label}</label>
      <Input
        variant='self'
        ref={ref}
        {...props}
        value={value ?? ''}
        onChange={(evt) => onChangeValue && onChangeValue(evt.target.value)}
      />
    </Box>
  ),
);
