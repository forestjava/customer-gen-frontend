import { User, useUsersQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { ButtonProps } from '../atoms/Button';
import { ListSelect } from '../atoms/ListSelect';

type Props = ButtonProps & {
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: Partial<User>[];
  onChangeValue?: (value: Partial<User>[]) => void;
};

export const InputUsers: React.FC<Props> = ({ label, value, onChangeValue, ...props }) => {
  const { data } = useUsersQuery();

  return (
    <Box variant='label-input'>
      <label>{label}</label>
      <ListSelect
        options={data?.users}
        compare={(a, b) => a.id === b.id}
        present={(item) => item.username}
        value={value}
        onChangeValue={onChangeValue}
        {...props}
      />
    </Box>
  );
};
