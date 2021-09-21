import * as S from './AddButton.styles';
import { useState, useRef } from 'react';
import { Button } from '@material-ui/core';
import { CloseRounded, AddRounded } from '@material-ui/icons';
import { EditInput } from '..';
import { useActions, useAppSelector, useOutsideClick } from '../../hooks';

interface AddButtonProps {
  btnType: 'list' | 'item';
  listId?: string;
}

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

  const handleListItem = () => {
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
            <EditInput
              input={input}
              inputHandler={setInput}
              buttonText='Add List'
              buttonHandler={handleList}
              activeHandler={setActive}
            />
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
            <EditInput
              input={input}
              inputHandler={setInput}
              buttonText='Add Task'
              buttonHandler={handleListItem}
              activeHandler={setActive}
            />
          </>
        ) : (
          <>
            <S.Wrap>
              <AddRounded /> New Task
            </S.Wrap>
          </>
        )}
      </S.ItemButton>
    );
};
export default AddButton;
