import { TextField } from '@material-ui/core';
import { Controller, Control } from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  defaultValue: string;
  control: Control;
  error?: string;
  errorMessage?: string;
}

export const Input = ({
  id,
  label,
  defaultValue,
  control,
  error,
  errorMessage,
}: InputProps) => {
  return (
    <Controller
      name={id}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          variant='outlined'
          style={{ width: '100%' }}
          error={!!error}
          helperText={error ? errorMessage : ''}
        />
      )}
    ></Controller>
  );
};
