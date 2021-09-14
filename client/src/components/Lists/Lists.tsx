import { useState } from 'react';
import { useAppSelector } from '../../hooks';
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
  const data = useAppSelector(state => state.board);
  const { columnOrder, columns, tasks } = data.board as Board;
  const handleDragEnd = () => {
    console.log('hello world');
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
                console.log(column, colTasks);
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
