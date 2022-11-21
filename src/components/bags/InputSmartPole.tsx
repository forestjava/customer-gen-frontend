import { SmartPole, useSmartPolesQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { ButtonProps } from '../atoms/Button';
import { ButtonSelect } from '../atoms/ButtonSelect';

type Props = ButtonProps & {
  label: string;
  placeholder: string;
  required?: boolean;
  value?: Partial<SmartPole>;
  onChangeValue?: (value: Partial<SmartPole>) => void;
};

export const InputSmartPole: React.FC<Props> = ({ label, placeholder, value, onChangeValue, ...props }) => {
  const { data } = useSmartPolesQuery();

  return (
    <Box variant='label-input'>
      <label>{label}</label>
      <ButtonSelect
        placeholder={placeholder}
        options={data?.smartPoles}
        present={(item) => item.name}
        value={value}
        onChangeValue={onChangeValue}
        {...props}
      />
    </Box>
  );
};
