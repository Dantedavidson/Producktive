import { useState } from 'react';
import { useActions, useAppSelector } from '../../hooks';
import * as S from './Lists.styles';
import { List } from '..';
import { Board } from '../../state';
interface ListsProps {}

const Lists = ({}: ListsProps) => {
  const { board: boardState, user: userState } = useAppSelector(state => state);
  const { updateList, moveListItem } = useActions();
  const { reorderList } = useActions();
  const { columnOrder, columns, tasks } = boardState.board as Board;

  return (
    <S.Container>
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
    </S.Container>
  );
};

export default Lists;
