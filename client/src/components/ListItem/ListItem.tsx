import * as S from './ListItem.styles';

export type Task = {
  id: string;
  title: string;
  content: string;
};

export const ListItem = ({ task, index }: { task: Task; index: number }) => {
  return <S.Container>{task.title}</S.Container>;
};
