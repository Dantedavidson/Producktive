import { useState } from 'react';
import { useActions, useAppSelector } from '../../hooks';
import * as S from './Lists.styles';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { List } from '..';
import { Board } from '../../state';
interface ListsProps {}

const Lists = ({}: ListsProps) => {
  const { board: boardState, user: userState } = useAppSelector(state => state);
  const { updateList, moveListItem } = useActions();

  const { reorderList } = useActions();
  const { columnOrder, columns, tasks } = boardState.board as Board;
  const handleDragEnd = (result: DropResult) => {
    if (!userState.token) return;
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (type === 'column') {
      const newColumnOrder = Array.from(columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      reorderList(newColumnOrder, userState.token);
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];
    console.log(start, finish);

    if (start == finish) {
      const newTasksIds = Array.from(start.tasks);

      newTasksIds.splice(source.index, 1);
      newTasksIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        tasks: newTasksIds,
      };
      updateList(newColumn, userState.token);
      return;
    }

    const startTasksIds = Array.from(start.tasks);
    startTasksIds.splice(source.index, 1);
    const from = {
      ...start,
      tasks: startTasksIds,
    };
    const finishTasksIds = Array.from(finish.tasks);
    finishTasksIds.splice(destination.index, 0, draggableId);
    const to = {
      ...finish,
      tasks: finishTasksIds,
    };
    moveListItem(from, to, userState.token);
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
        {provided => {
          return (
            <S.Container {...provided.droppableProps} ref={provided.innerRef}>
              {columnOrder.map((col, index) => {
                const column = columns[col];
                const colTasks = column.tasks.map(
                  (taskIds: string) => tasks[taskIds]
                );

                return (
                  <List
                    key={column.id}
                    index={index}
                    column={column}
                    tasks={colTasks}
                  />
                );
              })}
              {provided.placeholder}
            </S.Container>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};
export default Lists;
