import React from 'react';
import { Input as StyledInput } from './Form.styles';

interface Props {
  value: string;
  label: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleEnter: () => void;
}

const Input = React.forwardRef<any, Props>((props, ref) => {
  return (
    <StyledInput
      ref={ref}
      onFocus={e =>
        e.currentTarget.setSelectionRange(
          e.currentTarget.value.length,
          e.currentTarget.value.length
        )
      }
      onKeyPress={e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          props.handleEnter();
        }
      }}
      autoFocus
      aria-label={props.label}
      value={props.value}
      onChange={e => {
        props.setValue(e.target.value);
      }}
    />
  );
});

export default Input;
