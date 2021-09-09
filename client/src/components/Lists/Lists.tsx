import { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { List } from '..';
import data from '../../Data.json';
interface ListsProps {}
const Container = styled.div`
  display: flex;
  align-items: flex-start;
`;
const Lists = ({}: ListsProps) => {
  const { columnOrder, columns } = data;
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
                const tasks = column.taskIds.map(
                  (taskIds: string) => data.tasks[taskIds]
                );
                return (
                  <List
                    key={column.id}
                    index={index}
                    column={column}
                    tasks={tasks}
                  />
                );
              })}
            </Container>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};
export default Lists;
