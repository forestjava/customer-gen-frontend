import { Alert, useAlertsQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { ButtonProps } from '../atoms/Button';
import { ButtonSelect } from '../atoms/ButtonSelect';

type Props = ButtonProps & {
  label: string;
  placeholder: string;
  required?: boolean;
  value?: Partial<Alert>;
  onChangeValue?: (value: Partial<Alert>) => void;
};

export const InputAlert: React.FC<Props> = ({ label, placeholder, value, onChangeValue, ...props }) => {
  const { data } = useAlertsQuery();

  return (
    <Box variant='label-input'>
      <label>{label}</label>
      <ButtonSelect
        placeholder={placeholder}
        options={data?.alerts}
        present={(item) => item.message}
        value={value}
        onChangeValue={onChangeValue}
        {...props}
      />
    </Box>
  );
};
