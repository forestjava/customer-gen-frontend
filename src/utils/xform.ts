import React from 'react';
import { useNavigate } from 'react-router-dom';

type FieldValues = Record<string, any>;

type UseXFormProps<TFieldValues> = {
  defaultValues?: Partial<TFieldValues> | null;
  disabled?: boolean;
};

export const useXForm = <TFieldValues extends FieldValues = FieldValues>(options?: UseXFormProps<TFieldValues>) => {
  const defaultState = {
    values: options?.defaultValues || ({} as Partial<TFieldValues>),
    modified: false,
  };
  // copy values to inner state
  const [state, setState] = React.useState(defaultState);
  React.useEffect(() => setState(defaultState), [options?.defaultValues]);

  const reset = (values: Partial<TFieldValues>) => {
    setState({ values, modified: true });
  };

  const input = (key: keyof TFieldValues) => {
    return {
      disabled: options?.disabled, // TODO? show skeletons instead disabled inputs
      value: state.values?.[key] as any,
      onChangeValue: (value: any) => setState({ values: { ...state.values, [key]: value }, modified: true }),
    };
  };

  const handleSubmit = (callback: (data: Partial<TFieldValues>) => void) => (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    callback(state.values);
  };

  const button = (type?: 'reset' | 'button' | 'submit') => ({
    type,
    disabled: options?.disabled, // TODO inner spinner icon onLoading?
  });

  const navigate = useNavigate();
  const close = () => {
    navigate(-1);
  };

  return {
    input,
    button,
    handleSubmit,
    values: state.values,
    modified: state.modified,
    reset,
    close,
  };
};
