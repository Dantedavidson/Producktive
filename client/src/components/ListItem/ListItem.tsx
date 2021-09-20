import * as S from './ListItem.styles';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '../../state';
import { MoreHoriz } from '@material-ui/icons';
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
          <S.Title>{task.title}</S.Title>
          <S.Wrapper>
            <MoreHoriz />
          </S.Wrapper>
        </S.Container>
      )}
    </Draggable>
  );
};
