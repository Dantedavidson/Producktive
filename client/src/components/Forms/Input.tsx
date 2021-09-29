import React from 'react';
import { Input as StyledInput } from './Form.styles';

interface Props {
  value: string;
  label: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Input = React.forwardRef<any, Props>((props, ref) => {
  return (
    <StyledInput
      ref={ref}
      aria-label={props.label}
      value={props.value}
      onChange={e => props.setValue(e.target.value)}
    />
  );
});

export default Input;
