import { Solution, useSolutionsQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { ButtonProps } from '../atoms/Button';
import { ButtonSelect } from '../atoms/ButtonSelect';

type Props = ButtonProps & {
  label: string;
  placeholder: string;
  required?: boolean;
  value?: Partial<Solution>;
  onChangeValue?: (value: Partial<Solution>) => void;
};

export const InputSolution: React.FC<Props> = ({ label, placeholder, value, onChangeValue, ...props }) => {
  const { data } = useSolutionsQuery();

  return (
    <Box variant='label-input'>
      <label>{label}</label>
      <ButtonSelect
        placeholder={placeholder}
        options={data?.solutions}
        present={(item) => item.name}
        value={value}
        onChangeValue={onChangeValue}
        {...props}
      />
    </Box>
  );
};
