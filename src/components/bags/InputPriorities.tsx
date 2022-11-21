import { Priority, usePrioritiesQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { ButtonProps } from '../atoms/Button';
import { ListSelect } from '../atoms/ListSelect';

type Props = ButtonProps & {
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: Partial<Priority>[];
  onChangeValue?: (value: Partial<Priority>[]) => void;
};

export const InputPriorities: React.FC<Props> = ({ label, value, onChangeValue, ...props }) => {
  const { data } = usePrioritiesQuery();

  return (
    <Box variant='label-input'>
      <label>{label}</label>
      <ListSelect
        options={data?.priorities}
        compare={(a, b) => a.id === b.id}
        present={(item) => item.name}
        value={value}
        onChangeValue={onChangeValue}
        {...props}
      />
    </Box>
  );
};
