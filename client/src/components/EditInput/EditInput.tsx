import { useRef } from 'react';
import { Button } from '@material-ui/core';
import { CloseRounded } from '@material-ui/icons';
import { Input } from '../index';
import { useOutsideClick } from '../../hooks';
import * as S from './EditInput.styles';
interface Props {
  input: string;
  label: string;
  initial?: string;
  buttonText: string;
  inputHandler: React.Dispatch<React.SetStateAction<string>>;
  activeHandler: React.Dispatch<React.SetStateAction<boolean>>;
  buttonHandler: () => void;
  enterHandler: () => void;
}

const EditInput = ({
  input,
  label,
  buttonText,
  initial,
  inputHandler,
  buttonHandler,
  activeHandler,
  enterHandler,
}: Props) => {
  const ref = useRef<any>(null);
  useOutsideClick(ref, activeHandler);
  return (
    <S.Container ref={ref}>
      <Input
        label={label}
        value={input}
        setValue={inputHandler}
        handleEnter={enterHandler}
      />
      <S.Row className='stop-text-select'>
        <Button
          variant='contained'
          color='primary'
          size='small'
          style={{ height: 30 }}
          onClick={buttonHandler}
        >
          {buttonText}
        </Button>
        <CloseRounded
          style={{ fontSize: 30, cursor: 'pointer', marginLeft: 5 }}
          onClick={e => {
            e.stopPropagation();
            inputHandler(initial ? initial : '');
            activeHandler(false);
          }}
        />
      </S.Row>
    </S.Container>
  );
};

export default EditInput;

{
  /* <S.Input
        aria-label={label}
        onChange={e => inputHandler(e.target.value)}
        value={input}
        autoFocus
        onFocus={e =>
          e.currentTarget.setSelectionRange(
            e.currentTarget.value.length,
            e.currentTarget.value.length
          )
        }
        onKeyPress={e => {
          console.log(e.key);
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
      /> */
}
