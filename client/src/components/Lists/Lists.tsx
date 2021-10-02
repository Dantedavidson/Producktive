import { Container, DropResult } from 'react-smooth-dnd';
import { List } from '..';
import { useActions, useAppSelector } from '../../hooks';
import { Board } from '../../state';
import { applyDrag } from '../../utility';

const Lists = () => {
  const { board: boardState, user: userState } = useAppSelector(state => state);
  const { reorderList } = useActions();
  const { columnOrder, columns, tasks } = boardState.board as Board;
  const onColumnDrop = (dropResult: DropResult) => {
    const { removedIndex, addedIndex } = dropResult;
    if (removedIndex !== null || addedIndex !== null) {
      const newColumnOrder = applyDrag(columnOrder, dropResult);
      reorderList(boardState.board as Board, newColumnOrder, userState);
    }
  };
  return (
    <Container
      autoScrollEnabled
      orientation='horizontal'
      onDrop={e => onColumnDrop(e)}
      dragHandleSelector='.dragHandle'
      dropPlaceholder={{
        animationDuration: 150,
        showOnTop: true,
        className: 'column-drop-preview',
      }}
      dragClass='column-ghost'
      nonDragAreaSelector='no-drag'
    >
      {columnOrder.map((col, index) => {
        console.log(col);
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
