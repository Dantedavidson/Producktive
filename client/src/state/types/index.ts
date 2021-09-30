export interface UserState {
  loading: boolean;
  error: string | null;
  token: string | null;
  guest: boolean;
}

export interface BoardState {
  loading: boolean;
  error: string | null;
  board: Board | null;
}

export type Task = {
  id: string;
  title: string;
  content: string;
  status: boolean;
};

export type Column = {
  id: string;
  title: string;
  tasks: string[];
};

export type Board = {
  id: string;
  tasks: {
    [key: string]: Task;
  };
  columns: {
    [key: string]: Column;
  };
  columnOrder: string[];
};
