import { UserRole, useUserRolesQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { ButtonProps } from '../atoms/Button';
import { ListSelect } from '../atoms/ListSelect';

type Props = ButtonProps & {
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: Partial<UserRole>[];
  onChangeValue?: (value: Partial<UserRole>[]) => void;
};

export const InputUserRoles: React.FC<Props> = ({ label, value, onChangeValue, ...props }) => {
  const { data } = useUserRolesQuery();

  return (
    <Box variant='label-input'>
      <label>{label}</label>
      <ListSelect
        options={data?.userRoles}
        compare={(a, b) => a.id === b.id}
        present={(item) => item.name}
        value={value}
        onChangeValue={onChangeValue}
        {...props}
      />
    </Box>
  );
};
