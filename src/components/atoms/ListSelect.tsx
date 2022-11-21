import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { usePopover } from '../../utils/popovers';
import { Box } from './Box';
import { Button, ButtonProps } from './Button';

type Props<DataType = any> = ButtonProps & {
  options?: DataType[];
  compare: (value1: DataType, value2: DataType) => boolean; // should compare passed values using `DataType` keys
  present: (value: DataType) => string; // should return text representation of value
  value?: DataType[];
  onChangeValue?: (value: DataType[]) => void;
};

export const ListSelect: React.FC<Props> = ({ options, present, compare, value, onChangeValue, ...props }) => {
  // copy value to inner state
  const [innerValue, setInnerValue] = React.useState(value ?? []);
  React.useEffect(() => setInnerValue(value ?? []), [value]);

  const remove = (removing: any) => {
    const nextValue = innerValue.filter((item) => !compare(item, removing));
    setInnerValue(nextValue);
    onChangeValue && onChangeValue(nextValue);
  };

  const append = (item: any) => {
    const nextValue = [...innerValue, item];
    setInnerValue(nextValue);
    onChangeValue && onChangeValue(nextValue);
  };

  const unselected = (item: any) => !innerValue.find((valueItem) => compare(valueItem, item));

  const trigger = React.useRef(null);
  const content = React.useRef(null);
  const popover = usePopover();

  const togglePopover = () => {
    popover.toggle(trigger, content, { placement: 'bottom' });
  };

  return (
    <>
      <Box variant='selected-list'>
        {innerValue.map((item, i) => (
          <Box key={i} variant='selected-list-item'>
            <span>{present(item)}</span>
            <Button variant='icon' icon={<XCircleIcon />} className='remove' onClick={() => remove(item)} />
          </Box>
        ))}
        <Button
          ref={trigger}
          variant='icon'
          icon={<PlusCircleIcon />}
          className='append'
          onClick={() => togglePopover()}
          {...props}
        />
      </Box>
      {popover.isOpen && (
        <ul ref={content} className='select-list'>
          {options &&
            options.filter(unselected).map((item, i) => (
              <li key={i}>
                <Button
                  variant='select-item'
                  onClick={() => {
                    append(item);
                    popover.close();
                  }}
                >
                  {present(item)}
                </Button>
              </li>
            ))}
        </ul>
      )}
    </>
  );
};
