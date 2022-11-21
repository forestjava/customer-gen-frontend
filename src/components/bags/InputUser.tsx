import { User, useUsersQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { ButtonProps } from '../atoms/Button';
import { ButtonSelect } from '../atoms/ButtonSelect';

type Props = ButtonProps & {
  label: string;
  placeholder: string;
  required?: boolean;
  value?: Partial<User>;
  onChangeValue?: (value: Partial<User>) => void;
};

export const InputUser: React.FC<Props> = ({ label, placeholder, value, onChangeValue, ...props }) => {
  const { data } = useUsersQuery();

  return (
    <Box variant='label-input'>
      <label>{label}</label>
      <ButtonSelect
        placeholder={placeholder}
        options={data?.users}
        present={(item) => item.username}
        value={value}
        onChangeValue={onChangeValue}
        {...props}
      />
    </Box>
  );
};
