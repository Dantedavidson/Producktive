import { TextField, TextFieldProps } from '@material-ui/core';
import { Controller, Control } from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  defaultValue: string;
  control: Control;
}

export const Input = ({ id, label, defaultValue, control }: InputProps) => {
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
        />
      )}
    ></Controller>
  );
};
