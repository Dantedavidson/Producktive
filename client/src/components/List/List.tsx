import * as S from './List.styles';
import { useState, useEffect, useRef } from 'react';
import { Close, MoreHoriz } from '@material-ui/icons';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { ListItem, AddButton } from '../index';
import { Column } from '../../state';
import { Task } from '../../state';
import { useActions, useAppSelector, useOutsideClick } from '../../hooks';
import Modal from '../Modal/Modal';

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

  useOutsideClick(titleRef, setEditTitle);
  useEffect(() => {
    if (!token || title === column.title || !title) return;
    updateList({ ...column, title }, token);
  }, [editTitle]);
  return (
    <Draggable draggableId={column.id} index={index}>
      {provided => {
        return (
          <>
            <S.ListWrapper id='noScroll'>
              <S.List {...provided.draggableProps} ref={provided.innerRef}>
                <S.Header {...provided.dragHandleProps}>
                  {editTitle ? (
                    <S.Input
                      ref={titleRef}
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    />
                  ) : (
                    <S.Title onClick={() => setEditTitle(true)}>
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
                  <S.Text
                    onClick={() => deleteList(column.id, token as string)}
                  >
                    Delete List
                  </S.Text>
                </Modal>
                <Droppable droppableId={column.id} type='task'>
                  {(provided, snapshot) => (
                    <S.ListItemContainer
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      isDraggingOver={snapshot.isDraggingOver}
                    >
                      {tasks.map((task, index) => (
                        <ListItem
                          key={task.id}
                          task={task}
                          index={index}
                          list={column}
                        />
                      ))}
                      {provided.placeholder}
                    </S.ListItemContainer>
                  )}
                </Droppable>
                <AddButton btnType='item' listId={column.id} />
              </S.List>
            </S.ListWrapper>
          </>
        );
      }}
    </Draggable>
  );
};
export default List;
