import { Company, useCompaniesQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { ButtonProps } from '../atoms/Button';
import { ButtonSelect } from '../atoms/ButtonSelect';

type Props = ButtonProps & {
  label: string;
  placeholder: string;
  required?: boolean;
  value?: Partial<Company>;
  onChangeValue?: (value: Partial<Company>) => void;
};

export const InputCompany: React.FC<Props> = ({ label, placeholder, value, onChangeValue, ...props }) => {
  const { data } = useCompaniesQuery();

  return (
    <Box variant='label-input'>
      <label>{label}</label>
      <ButtonSelect
        placeholder={placeholder}
        options={data?.companies}
        present={(item) => item.name}
        value={value}
        onChangeValue={onChangeValue}
        {...props}
      />
    </Box>
  );
};
