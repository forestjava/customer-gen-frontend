import React from 'react';
import { usePopover } from '../../utils/popovers';
import { Button, ButtonProps } from './Button';

import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

export type ButtonSelectProps<DataType = any> = ButtonProps & {
  placeholder: string;
  required?: boolean;
  options?: DataType[];
  present?: (value: DataType) => string; // should return text representation of passed `value` using `DataType` props
  value?: DataType;
  onChangeValue?: (value: DataType) => void;
};

export const ButtonSelect: React.FC<ButtonSelectProps> = ({
  placeholder,
  required,
  options,
  present,
  value,
  onChangeValue,
  ...props
}) => {
  // copy value to inner state
  const [innerValue, setInnerValue] = React.useState(value);
  React.useEffect(() => setInnerValue(value), [value]);

  const button = innerValue ? (present ? present(innerValue) : innerValue) : placeholder;

  const trigger = React.useRef(null);
  const content = React.useRef(null);
  const popover = usePopover();

  const togglePopover = () => {
    popover.toggle(trigger, content, { placement: 'bottom', sameWidth: true });
  };

  return (
    <>
      <Button
        ref={trigger}
        variant='select'
        iconRight={popover.isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        onClick={togglePopover}
        {...props}
      >
        {button}
      </Button>
      {popover.isOpen && (
        <ul ref={content} className='select-list'>
          {options &&
            options.map((value, i) => (
              <li key={i}>
                <Button
                  variant='select-item'
                  onClick={() => {
                    setInnerValue(value);
                    onChangeValue && onChangeValue(value);
                    popover.close();
                  }}
                >
                  {present ? present(value) : value}
                </Button>
              </li>
            ))}
        </ul>
      )}
    </>
  );
};
