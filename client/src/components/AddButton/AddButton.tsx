import * as S from './AddButton.styles';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { CloseRounded, AddRounded } from '@material-ui/icons';
import { useActions, useAppSelector } from '../../hooks';

interface AddButtonProps {
  btnType: 'list' | 'item';
  listId?: string;
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

const AddButton = ({ btnType, listId }: AddButtonProps) => {
  const [active, setActive] = useState(false);
  const [input, setInput] = useState('');
  const { createList, createListItem } = useActions();
  const { token } = useAppSelector(state => state.user);
  const ref = useRef<any>(null);

  useOutsideClick(ref, setActive);

  const handleList = () => {
    if (!token || !input) return;
    setInput('');
    setActive(false);
    createList(input, token);
  };

  const handleItem = () => {
    if (!token || !input || !listId) return;
    setInput('');
    setActive(false);
    createListItem(listId, input, token);
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
              <CloseRounded
                style={{ fontSize: 30, cursor: 'pointer' }}
                onClick={e => {
                  e.stopPropagation();
                  setInput('');
                  setActive(false);
                }}
              />
            </S.Row>
          </>
        ) : (
          <>
            <S.Wrap>
              <AddRounded /> New List
            </S.Wrap>
          </>
        )}
      </S.ListButton>
    );
  else
    return (
      <S.ItemButton ref={ref} active={active} onClick={() => setActive(true)}>
        {active ? (
          <>
            <S.Input onChange={e => setInput(e.target.value)} value={input} />
            <S.Row>
              <Button
                variant='contained'
                color='primary'
                size='small'
                style={{ height: 30 }}
                onClick={handleItem}
              >
                Add Item
              </Button>
              <CloseRounded
                style={{ fontSize: 30, cursor: 'pointer' }}
                onClick={e => {
                  e.stopPropagation();
                  setInput('');
                  setActive(false);
                }}
              />
            </S.Row>
          </>
        ) : (
          <S.Wrap>
            <AddRounded /> New Item
          </S.Wrap>
        )}
      </S.ItemButton>
    );
};
export default AddButton;
