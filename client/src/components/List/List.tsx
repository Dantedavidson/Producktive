import * as S from './List.styles';
import { useState, useEffect, useRef } from 'react';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { MoreHoriz } from '@material-ui/icons';
import { ListItem, AddButton, Input } from '../index';
import { Board, Column, Task } from '../../state';
import { applyDrag } from '../../utility';
import { useActions, useAppSelector, useOutsideClick } from '../../hooks';
import Modal from '../Modal/Modal';

interface ListProps {
  index: number;
  column: Column;
  tasks: Task[];
}

const List = ({ column, tasks }: ListProps) => {
  const [modal, setModal] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState(column.title);
  const { deleteList, updateList, clearList, copyList } = useActions();
  const { board: boardState, user: userState } = useAppSelector(state => state);
  const titleRef = useRef(null);
  const ellipseRef = useRef(null);

  const onTaskDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex } = dropResult;
    if ((removedIndex !== null || addedIndex !== null) && userState.token) {
      const newColumn = Object.assign({}, column);
      const newTaskIds = applyDrag(newColumn.tasks, dropResult);
      updateList({ ...newColumn, tasks: newTaskIds }, userState.token);
    }
  };
  const getChildPayload = (index: number) => {
    return tasks[index].id;
  };
  useOutsideClick(titleRef, setEditTitle);
  useEffect(() => {
    if (!userState.token || title === column.title || !title) return;
    updateList({ ...column, title }, userState.token);
  }, [editTitle]);
  return (
    <Draggable>
      <S.ListWrapper className='no-indiana-scroll'>
        <S.List>
          <S.Header>
            {editTitle ? (
              <Input
                ref={titleRef}
                label='Edit List Title'
                value={title}
                setValue={setTitle}
                handleEnter={() => {
                  setTitle(title);
                  setEditTitle(false);
                }}
              />
            ) : (
              <S.Title
                className='dragHandle'
                onClick={() => setEditTitle(true)}
              >
                {column.title}
              </S.Title>
            )}
            {<MoreHoriz ref={ellipseRef} onClick={() => setModal(!modal)} />}
          </S.Header>

          <Modal
            handler={setModal}
            active={modal}
            styles={{
              corners: 'sharp',
              position: 'absolute',
              positionTop: 2.5,
              width: 17.8125,
              height: 'auto',
            }}
            ref={ellipseRef}
          >
            <S.Text $isTitle>List Actions</S.Text>
            <S.Text
              onClick={() => {
                copyList(boardState.board as Board, column, userState);
                setModal(false);
              }}
            >
              Copy List
            </S.Text>
            <S.Text
              onClick={() => {
                clearList(boardState.board as Board, column, userState);
                setModal(false);
              }}
            >
              Clear List
            </S.Text>
            <S.Text
              onClick={() => {
                deleteList(boardState.board as Board, userState, column.id);
                setModal(false);
              }}
            >
              Delete List
            </S.Text>
          </Modal>
          <S.ListItemContainer>
            <Container
              groupName='list'
              orientation='vertical'
              onDrop={e => onTaskDrop(e)}
              getChildPayload={getChildPayload}
              dragClass='card-ghost'
              dropClass='card-ghost-drop'
              dropPlaceholder={{
                animationDuration: 150,
                showOnTop: true,
                className: 'card-drop-preview',
              }}
              nonDragAreaSelector='.no-drag'
              dragHandleSelector='.drag-handle'
            >
              {tasks.map((task, index) => (
                <ListItem
                  key={task.id}
                  task={task}
                  index={index}
                  list={column}
                />
              ))}
            </Container>
          </S.ListItemContainer>

          <AddButton btnType='item' listId={column.id} />
        </S.List>
      </S.ListWrapper>
    </Draggable>
  );
};
export default List;
