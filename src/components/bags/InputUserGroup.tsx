import { UserGroup, useUserGroupsQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { ButtonProps } from '../atoms/Button';
import { ButtonSelect } from '../atoms/ButtonSelect';

type Props = ButtonProps & {
  label: string;
  placeholder: string;
  required?: boolean;
  value?: Partial<UserGroup>;
  onChangeValue?: (value: Partial<UserGroup>) => void;
};

export const InputUserGroup: React.FC<Props> = ({ label, placeholder, value, onChangeValue, ...props }) => {
  const { data } = useUserGroupsQuery();

  return (
    <Box variant='label-input'>
      <label>{label}</label>
      <ButtonSelect
        placeholder={placeholder}
        options={data?.userGroups}
        present={(item) => item.name}
        value={value}
        onChangeValue={onChangeValue}
        {...props}
      />
    </Box>
  );
};
