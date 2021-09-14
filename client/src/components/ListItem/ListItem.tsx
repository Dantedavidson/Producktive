import * as S from './ListItem.styles';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '../../state';
export const ListItem = ({ task, index }: { task: Task; index: number }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <S.Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {task.title}
        </S.Container>
      )}
    </Draggable>
  );
};
