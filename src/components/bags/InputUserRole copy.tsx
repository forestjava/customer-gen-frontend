import { UserRole, useUserRolesQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { ButtonProps } from '../atoms/Button';
import { ButtonSelect } from '../atoms/ButtonSelect';

type Props = ButtonProps & {
  label: string;
  placeholder: string;
  required?: boolean;
  value?: Partial<UserRole>;
  onChangeValue?: (value: Partial<UserRole>) => void;
};

export const InputUserRole: React.FC<Props> = ({ label, placeholder, value, onChangeValue, ...props }) => {
  const { data } = useUserRolesQuery();

  return (
    <Box variant='label-input'>
      <label>{label}</label>
      <ButtonSelect
        placeholder={placeholder}
        options={data?.userRoles}
        present={(item) => item.name}
        value={value}
        onChangeValue={onChangeValue}
        {...props}
      />
    </Box>
  );
};
