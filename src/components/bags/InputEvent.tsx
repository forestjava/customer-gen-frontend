import { Event, useEventsQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { ButtonProps } from '../atoms/Button';
import { ButtonSelect } from '../atoms/ButtonSelect';

type Props = ButtonProps & {
  label: string;
  placeholder: string;
  required?: boolean;
  value?: Partial<Event>;
  onChangeValue?: (value: Partial<Event>) => void;
};

export const InputEvent: React.FC<Props> = ({ label, placeholder, value, onChangeValue, ...props }) => {
  const { data } = useEventsQuery();

  return (
    <Box variant='label-input'>
      <label>{label}</label>
      <ButtonSelect
        placeholder={placeholder}
        options={data?.events}
        present={(item) => item.message}
        value={value}
        onChangeValue={onChangeValue}
        {...props}
      />
    </Box>
  );
};
