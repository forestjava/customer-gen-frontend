import { SmartPole, useSmartPolesQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { ButtonProps } from '../atoms/Button';
import { ListSelect } from '../atoms/ListSelect';

type Props = ButtonProps & {
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: Partial<SmartPole>[];
  onChangeValue?: (value: Partial<SmartPole>[]) => void;
};

export const InputSmartPoles: React.FC<Props> = ({ label, value, onChangeValue, ...props }) => {
  const { data } = useSmartPolesQuery();

  return (
    <Box variant='label-input'>
      <label>{label}</label>
      <ListSelect
        options={data?.smartPoles}
        compare={(a, b) => a.id === b.id}
        present={(item) => item.name}
        value={value}
        onChangeValue={onChangeValue}
        {...props}
      />
    </Box>
  );
};
