import { Zone, useZonesQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { ButtonProps } from '../atoms/Button';
import { ButtonSelect } from '../atoms/ButtonSelect';

type Props = ButtonProps & {
  label: string;
  placeholder: string;
  required?: boolean;
  value?: Partial<Zone>;
  onChangeValue?: (value: Partial<Zone>) => void;
};

export const InputZone: React.FC<Props> = ({ label, placeholder, value, onChangeValue, ...props }) => {
  const { data } = useZonesQuery();

  return (
    <Box variant='label-input'>
      <label>{label}</label>
      <ButtonSelect
        placeholder={placeholder}
        options={data?.zones}
        present={(item) => item.name}
        value={value}
        onChangeValue={onChangeValue}
        {...props}
      />
    </Box>
  );
};
