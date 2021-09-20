import { useState } from 'react';
import { useActions, useAppSelector } from '../../hooks';
import styled from 'styled-components';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { List } from '..';
import { Board } from '../../state';
interface ListsProps {}
const Container = styled.div`
  display: flex;
  align-items: flex-start;
`;
const Lists = ({}: ListsProps) => {
  const { board: boardState, user: userState } = useAppSelector(state => state);
  const { updateList } = useActions();

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
    }

    // const startTasksIds = Array.from(start.taskIds);
    // startTasksIds.splice(source.index, 1);
    // const newStart = {
    //   ...start,
    //   taskIds: startTasksIds,
    // };
    // const finishTasksIds = Array.from(finish.taskIds);
    // finishTasksIds.splice(destination.index, 0, draggableId);
    // const newFinish = {
    //   ...finish,
    //   taskIds: finishTasksIds,
    // };

    // const newState = {
    //   ...data,
    //   columns: {
    //     ...data.columns,
    //     [newStart.id]: newStart,
    //     [newFinish.id]: newFinish,
    //   },
    // };
    // setData(newState);

    console.log('I am a task', result);
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
        {provided => {
          return (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
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
            </Container>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};
export default Lists;
