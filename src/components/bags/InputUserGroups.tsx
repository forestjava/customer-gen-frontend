import { UserGroup, useUserGroupsQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { ButtonProps } from '../atoms/Button';
import { ListSelect } from '../atoms/ListSelect';

type Props = ButtonProps & {
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: Partial<UserGroup>[];
  onChangeValue?: (value: Partial<UserGroup>[]) => void;
};

export const InputUserGroups: React.FC<Props> = ({ label, value, onChangeValue, ...props }) => {
  const { data } = useUserGroupsQuery();

  return (
    <Box variant='label-input'>
      <label>{label}</label>
      <ListSelect
        options={data?.userGroups}
        compare={(a, b) => a.id === b.id}
        present={(item) => item.name}
        value={value}
        onChangeValue={onChangeValue}
        {...props}
      />
    </Box>
  );
};
