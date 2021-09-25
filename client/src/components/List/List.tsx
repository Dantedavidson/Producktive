import * as S from './List.styles';
import { useState, useEffect, useRef } from 'react';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { Close, MoreHoriz } from '@material-ui/icons';
import { ListItem, AddButton } from '../index';
import { Column, Task } from '../../state';
import { applyDrag } from '../../utility';
import { useActions, useAppSelector, useOutsideClick } from '../../hooks';
import Modal from '../Modal/Modal';
import { userInfo } from 'os';

interface ListProps {
  index: number;
  column: Column;
  tasks: Task[];
}

const List = ({ index, column, tasks }: ListProps) => {
  const [modal, setModal] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState(column.title);
  const { deleteList, updateList } = useActions();
  const { token } = useAppSelector(state => state.user);
  const titleRef = useRef(null);

  const onTaskDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex, payload } = dropResult;
    if ((removedIndex !== null || addedIndex !== null) && token) {
      const newColumn = Object.assign({}, column);
      const newTaskIds = applyDrag(newColumn.tasks, dropResult);
      updateList({ ...newColumn, tasks: newTaskIds }, token);
    }
  };
  const getChildPayload = (index: number) => {
    return tasks[index].id;
  };
  useOutsideClick(titleRef, setEditTitle);
  useEffect(() => {
    if (!token || title === column.title || !title) return;
    updateList({ ...column, title }, token);
  }, [editTitle]);
  return (
    <Draggable>
      <S.ListWrapper className='noDrag'>
        <S.List>
          <S.Header>
            {editTitle ? (
              <S.Input
                ref={titleRef}
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            ) : (
              <S.Title
                className='dragHandle'
                onClick={() => setEditTitle(true)}
              >
                {column.title}
              </S.Title>
            )}
            <MoreHoriz onClick={() => setModal(!modal)} />
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
          >
            <S.Text $isTitle>List Actions</S.Text>
            <S.Text>Copy List</S.Text>
            <S.Text>Clear List</S.Text>
            <S.Text onClick={() => deleteList(column.id, token as string)}>
              Delete List
            </S.Text>
          </Modal>
          <S.ListItemContainer>
            <Container
              groupName='list'
              orientation='vertical'
              onDrop={e => onTaskDrop(e)}
              getChildPayload={getChildPayload}
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
