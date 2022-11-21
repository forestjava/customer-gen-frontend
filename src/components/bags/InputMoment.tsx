import React from 'react';
import { Box } from '../atoms/Box';
import { Input, InputProps } from '../atoms/Input';

type Props = InputProps & {
  label: string;
  value?: string;
  onChangeValue?: (value: string) => void;
};

export const InputMoment = React.forwardRef<HTMLInputElement, Props>(
  ({ label, value, onChangeValue, ...props }, ref) => {
    // copy value to inner value
    const [innerValue, setInnerValue] = React.useState<string>(value ?? new Date().toISOString());
    React.useEffect(() => setInnerValue(value ?? new Date().toISOString()), [value]);
    React.useEffect(() => {
      try {
        onChangeValue && onChangeValue(new Date(innerValue).toISOString());
      } catch {}
    }, [innerValue]);

    return (
      <Box variant='label-input'>
        <label>{label}</label>
        <Input
          variant='self'
          ref={ref}
          {...props}
          type='text'
          value={innerValue}
          onChange={(evt) => setInnerValue(evt.target.value)}
          onBlur={() => {
            try {
              new Date(innerValue).toISOString();
            } catch (err) {
              setInnerValue((err as Error).message);
            }
          }}
        />
      </Box>
    );
  },
);
