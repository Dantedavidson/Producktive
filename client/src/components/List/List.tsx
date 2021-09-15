import * as S from './List.styles';
import { useState, useEffect } from 'react';
import { Close, MoreHoriz } from '@material-ui/icons';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { ListItem, AddButton } from '../index';
import { Column } from '../../state';
import { Task } from '../../state';
import { useActions, useAppSelector } from '../../hooks';

interface ListProps {
  index: number;
  column: Column;
  tasks: Task[];
}

const List = ({ index, column, tasks }: ListProps) => {
  const [modal, setModal] = useState(false);
  const { deleteList } = useActions();
  const { token } = useAppSelector(state => state.user);
  useEffect(() => {
    console.log(column.id);
  }, []);
  return (
    <Draggable draggableId={column.id} index={index}>
      {provided => {
        return (
          <S.List {...provided.draggableProps} ref={provided.innerRef}>
            <S.Header {...provided.dragHandleProps}>
              <S.Title>{column.title}</S.Title>
              <MoreHoriz onClick={() => setModal(!modal)} />
            </S.Header>
            <S.Modal $display={modal}>
              <Close onClick={() => setModal(false)} />
              <S.Text $isTitle>List Actions</S.Text>
              <S.Text>Copy List</S.Text>
              <S.Text>Clear List</S.Text>
              <S.Text onClick={() => deleteList(column.id, token as string)}>
                Delete List
              </S.Text>
            </S.Modal>
            <Droppable droppableId={column.id} type='task'>
              {(provided, snapshot) => (
                <S.ListItemContainer
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {tasks.map((task, index) => (
                    <ListItem key={task.id} task={task} index={index} />
                  ))}
                  {provided.placeholder}
                </S.ListItemContainer>
              )}
            </Droppable>
            <AddButton btnType='item' />
          </S.List>
        );
      }}
    </Draggable>
  );
};
export default List;
