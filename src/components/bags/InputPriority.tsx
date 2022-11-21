import { Priority, usePrioritiesQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { ButtonProps } from '../atoms/Button';
import { ButtonSelect } from '../atoms/ButtonSelect';

type Props = ButtonProps & {
  label: string;
  placeholder: string;
  required?: boolean;
  value?: Partial<Priority>;
  onChangeValue?: (value: Partial<Priority>) => void;
};

export const InputPriority: React.FC<Props> = ({ label, placeholder, value, onChangeValue, ...props }) => {
  const { data } = usePrioritiesQuery();

  return (
    <Box variant='label-input'>
      <label>{label}</label>
      <ButtonSelect
        placeholder={placeholder}
        options={data?.priorities}
        present={(item) => item.name}
        value={value}
        onChangeValue={onChangeValue}
        {...props}
      />
    </Box>
  );
};
