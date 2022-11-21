import { Company, useCompaniesQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { ButtonProps } from '../atoms/Button';
import { ListSelect } from '../atoms/ListSelect';

type Props = ButtonProps & {
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: Partial<Company>[];
  onChangeValue?: (value: Partial<Company>[]) => void;
};

export const InputCompanies: React.FC<Props> = ({ label, value, onChangeValue, ...props }) => {
  const { data } = useCompaniesQuery();

  return (
    <Box variant='label-input'>
      <label>{label}</label>
      <ListSelect
        options={data?.companies}
        compare={(a, b) => a.id === b.id}
        present={(item) => item.name}
        value={value}
        onChangeValue={onChangeValue}
        {...props}
      />
    </Box>
  );
};
