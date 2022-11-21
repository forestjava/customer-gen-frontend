import { Zone, useZonesQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { ButtonProps } from '../atoms/Button';
import { ListSelect } from '../atoms/ListSelect';

type Props = ButtonProps & {
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: Partial<Zone>[];
  onChangeValue?: (value: Partial<Zone>[]) => void;
};

export const InputZones: React.FC<Props> = ({ label, value, onChangeValue, ...props }) => {
  const { data } = useZonesQuery();

  return (
    <Box variant='label-input'>
      <label>{label}</label>
      <ListSelect
        options={data?.zones}
        compare={(a, b) => a.id === b.id}
        present={(item) => item.name}
        value={value}
        onChangeValue={onChangeValue}
        {...props}
      />
    </Box>
  );
};
