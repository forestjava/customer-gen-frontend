import { Region, useRegionsQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { ButtonProps } from '../atoms/Button';
import { ListSelect } from '../atoms/ListSelect';

type Props = ButtonProps & {
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: Partial<Region>[];
  onChangeValue?: (value: Partial<Region>[]) => void;
};

export const InputRegions: React.FC<Props> = ({ label, value, onChangeValue, ...props }) => {
  const { data } = useRegionsQuery();

  return (
    <Box variant='label-input'>
      <label>{label}</label>
      <ListSelect
        options={data?.regions}
        compare={(a, b) => a.id === b.id}
        present={(item) => item.name}
        value={value}
        onChangeValue={onChangeValue}
        {...props}
      />
    </Box>
  );
};
