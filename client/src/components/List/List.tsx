import * as S from './List.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { ListItem, Task, AddButton } from '../index';

type Column = {
  id: string;
  title: string;
  taskIds: string[];
};

interface ListProps {
  index: number;
  column: Column;
  tasks: Task[];
}

const List = ({ index, column, tasks }: ListProps) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {provided => {
        return (
          <S.List
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <S.Header>
              <S.Title>{column.title}</S.Title>
              <FontAwesomeIcon icon={faEllipsisH} />
            </S.Header>
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
