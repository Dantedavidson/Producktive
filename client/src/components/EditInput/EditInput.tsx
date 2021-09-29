import { Button } from '@material-ui/core';
import { CloseRounded } from '@material-ui/icons';
import * as S from './EditInput.styles';
interface Props {
  input: string;
  initial?: string;
  buttonText: string;
  inputHandler: React.Dispatch<React.SetStateAction<string>>;
  activeHandler: React.Dispatch<React.SetStateAction<boolean>>;
  buttonHandler: () => void;
}

const EditInput = ({
  input,
  buttonText,
  initial,
  inputHandler,
  buttonHandler,
  activeHandler,
}: Props) => {
  return (
    <>
      <S.Input onChange={e => inputHandler(e.target.value)} value={input} />
      <S.Row>
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
    </>
  );
};

export default EditInput;
