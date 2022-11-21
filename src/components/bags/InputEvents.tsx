import { Event, useEventsQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { ButtonProps } from '../atoms/Button';
import { ListSelect } from '../atoms/ListSelect';

type Props = ButtonProps & {
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: Partial<Event>[];
  onChangeValue?: (value: Partial<Event>[]) => void;
};

export const InputEvents: React.FC<Props> = ({ label, value, onChangeValue, ...props }) => {
  const { data } = useEventsQuery();

  return (
    <Box variant='label-input'>
      <label>{label}</label>
      <ListSelect
        options={data?.events}
        compare={(a, b) => a.id === b.id}
        present={(item) => item.message}
        value={value}
        onChangeValue={onChangeValue}
        {...props}
      />
    </Box>
  );
};
