import React from 'react';
import { Box } from '../atoms/Box';
import { Input, InputProps } from '../atoms/Input';

type Props = InputProps & {
  label: string;
  value?: boolean;
  onChangeValue?: (value: boolean) => void;
};

export const InputBoolean = React.forwardRef<HTMLInputElement, Props>(
  ({ label, value, onChangeValue, ...props }, ref) => (
    <Box variant='label-input'>
      <label>{label}</label>
      <Input
        ref={ref}
        {...props}
        type='checkbox'
        checked={value ?? false}
        onChange={(evt) => onChangeValue && onChangeValue(evt.target.checked)}
      />
    </Box>
  ),
);
