import { DeviceType, useDeviceTypesQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { ButtonProps } from '../atoms/Button';
import { ListSelect } from '../atoms/ListSelect';

type Props = ButtonProps & {
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: Partial<DeviceType>[];
  onChangeValue?: (value: Partial<DeviceType>[]) => void;
};

export const InputDeviceTypes: React.FC<Props> = ({ label, value, onChangeValue, ...props }) => {
  const { data } = useDeviceTypesQuery();

  return (
    <Box variant='label-input'>
      <label>{label}</label>
      <ListSelect
        options={data?.deviceTypes}
        compare={(a, b) => a.id === b.id}
        present={(item) => item.name}
        value={value}
        onChangeValue={onChangeValue}
        {...props}
      />
    </Box>
  );
};
