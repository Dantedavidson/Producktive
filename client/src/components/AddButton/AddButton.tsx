import { AddRounded } from '@material-ui/icons';
import { Board } from '../../state';
import { useRef, useState } from 'react';
import { EditInput } from '..';
import { useActions, useAppSelector, useOutsideClick } from '../../hooks';
import * as S from './AddButton.styles';

interface AddButtonProps {
  btnType: 'list' | 'item';
  listId?: string;
}

const AddButton = ({ btnType, listId }: AddButtonProps) => {
  const [active, setActive] = useState(false);
  const [input, setInput] = useState('');
  const { createList, createListItem } = useActions();
  const { user, board } = useAppSelector(state => state);

  const ref = useRef<any>(null);

  useOutsideClick(ref, setActive);

  const handleList = () => {
    if (!input) return;
    setInput('');
    setActive(false);
    createList(board.board as Board, user, input);
  };

  const handleListItem = () => {
    if (!user.token || !input || !listId) return;
    setInput('');
    setActive(false);
    createListItem(listId, input, user.token);
  };

  if (btnType === 'list')
    return (
      <S.ListButton
        ref={ref}
        active={active}
        onClick={() => setActive(true)}
        className='no-indiana-scroll'
      >
        {active ? (
          <>
            <EditInput
              input={input}
              label='List Title'
              inputHandler={setInput}
              buttonText='Add List'
              buttonHandler={handleList}
              activeHandler={setActive}
              enterHandler={handleList}
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
              label='Task Title'
              inputHandler={setInput}
              buttonText='Add Task'
              buttonHandler={handleListItem}
              activeHandler={setActive}
              enterHandler={handleListItem}
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
