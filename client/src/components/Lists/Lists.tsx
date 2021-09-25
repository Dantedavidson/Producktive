import { useState } from 'react';
import { useActions, useAppSelector } from '../../hooks';
import * as S from './Lists.styles';
import { Container, DropResult } from 'react-smooth-dnd';
import { applyDrag } from '../../utility';
import { List } from '..';
import { Board } from '../../state';
interface ListsProps {}

const Lists = ({}: ListsProps) => {
  const { board: boardState, user: userState } = useAppSelector(state => state);
  const { reorderList } = useActions();
  const { columnOrder, columns, tasks } = boardState.board as Board;
  const onColumnDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex } = dropResult;
    if (
      (removedIndex !== null || addedIndex !== null) &&
      userState.token !== null
    ) {
      const newColumnOrder = applyDrag(columnOrder, dropResult);
      reorderList(newColumnOrder, userState.token);
    }
  };
  return (
    <Container
      autoScrollEnabled
      orientation='horizontal'
      onDrop={e => onColumnDrop(e)}
      dragHandleSelector='.dragHandle'
    >
      {columnOrder.map((col, index) => {
        const column = columns[col];
        const colTasks = column.tasks.map((taskIds: string) => tasks[taskIds]);

        return (
          <List
            key={column.id}
            index={index}
            column={column}
            tasks={colTasks}
          />
        );
      })}
    </Container>
  );
};

export default Lists;
