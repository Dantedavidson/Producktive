import mongoose from 'mongoose';

type Column = {
  id: string;
  title: string;
  tasks: string[];
};

type Todo = {
  id: string;
  title: string;
  content: string;
};

export interface BoardDocument extends mongoose.Document {
  tasks: {
    [id: string]: Todo;
  };
  columns: {
    [id: string]: Column;
  };
  columnOrder: string[];
}

const boardSchema = new mongoose.Schema({
  tasks: {
    task: {
      id: String,
      title: String,
      content: String,
    },
  },
  columns: {
    column: {
      id: String,
      title: String,
      tasks: [String],
    },
  },
  columnOrder: { type: [String] },
});

export default mongoose.model<BoardDocument>('Board', boardSchema);
