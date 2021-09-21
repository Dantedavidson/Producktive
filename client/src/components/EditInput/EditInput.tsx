import * as S from './EditInput.styles';
import { Button } from '@material-ui/core';
import { CloseRounded } from '@material-ui/icons';
interface Props {
  input: string;
  buttonText: string;
  inputHandler: React.Dispatch<React.SetStateAction<string>>;
  activeHandler: React.Dispatch<React.SetStateAction<boolean>>;
  buttonHandler: () => void;
}

const EditInput = ({
  input,
  buttonText,
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
          style={{ fontSize: 30, cursor: 'pointer' }}
          onClick={e => {
            e.stopPropagation();
            inputHandler('');
            activeHandler(false);
          }}
        />
      </S.Row>
    </>
  );
};

export default EditInput;
