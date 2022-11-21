import { DeviceType, useDeviceTypesQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { ButtonProps } from '../atoms/Button';
import { ButtonSelect } from '../atoms/ButtonSelect';

type Props = ButtonProps & {
  label: string;
  placeholder: string;
  required?: boolean;
  value?: Partial<DeviceType>;
  onChangeValue?: (value: Partial<DeviceType>) => void;
};

export const InputDeviceType: React.FC<Props> = ({ label, placeholder, value, onChangeValue, ...props }) => {
  const { data } = useDeviceTypesQuery();

  return (
    <Box variant='label-input'>
      <label>{label}</label>
      <ButtonSelect
        placeholder={placeholder}
        options={data?.deviceTypes}
        present={(item) => item.name}
        value={value}
        onChangeValue={onChangeValue}
        {...props}
      />
    </Box>
  );
};
