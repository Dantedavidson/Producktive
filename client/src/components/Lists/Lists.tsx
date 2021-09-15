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

  const { reorderList } = useActions();
  const { columnOrder, columns, tasks } = boardState.board as Board;
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    console.log('This is a result', result);
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
      reorderList(newColumnOrder, userState.token as string);
      return;
    }
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
