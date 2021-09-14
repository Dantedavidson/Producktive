export type Task = {
  id: string;
  title: string;
  content: string;
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
