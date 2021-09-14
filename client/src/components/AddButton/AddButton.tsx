import * as S from './AddButton.styles';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useActions, useAppSelector } from '../../hooks';

interface AddButtonProps {
  btnType: 'list' | 'item';
}

const useOutsideClick = (
  ref: React.MutableRefObject<any>,
  setActive: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    function handleClick(e: any) {
      if (ref.current && !ref.current.contains(e.target)) {
        setActive(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref]);
};

const AddButton = ({ btnType }: AddButtonProps) => {
  const [active, setActive] = useState(true);
  const [input, setInput] = useState('');
  const { createList } = useActions();
  const { token } = useAppSelector(state => state.user);
  const ref = useRef<any>(null);
  useOutsideClick(ref, setActive);
  const handleList = () => {
    if (!token || !input) return;
    setInput('');
    setActive(false);
    createList(input, token);
  };
  if (btnType === 'list')
    return (
      <S.ListButton ref={ref} active={active} onClick={() => setActive(true)}>
        {active ? (
          <>
            <S.Input onChange={e => setInput(e.target.value)} value={input} />
            <S.Row>
              <Button
                variant='contained'
                color='primary'
                size='small'
                style={{ height: 30 }}
                onClick={handleList}
              >
                Add List
              </Button>
              <CloseIcon style={{ fontSize: 30, cursor: 'pointer' }} />
            </S.Row>
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faPlus} /> New List
          </>
        )}
      </S.ListButton>
    );
  else
    return (
      <S.ItemButton active>
        <FontAwesomeIcon icon={faPlus} /> New Item
      </S.ItemButton>
    );
};
export default AddButton;
