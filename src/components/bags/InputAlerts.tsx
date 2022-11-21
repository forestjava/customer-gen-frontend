import { Alert, useAlertsQuery } from '../../api/generated';
import { Box } from '../atoms/Box';
import { ButtonProps } from '../atoms/Button';
import { ListSelect } from '../atoms/ListSelect';

type Props = ButtonProps & {
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: Partial<Alert>[];
  onChangeValue?: (value: Partial<Alert>[]) => void;
};

export const InputAlerts: React.FC<Props> = ({ label, value, onChangeValue, ...props }) => {
  const { data } = useAlertsQuery();

  return (
    <Box variant='label-input'>
      <label>{label}</label>
      <ListSelect
        options={data?.alerts}
        compare={(a, b) => a.id === b.id}
        present={(item) => item.message}
        value={value}
        onChangeValue={onChangeValue}
        {...props}
      />
    </Box>
  );
};
