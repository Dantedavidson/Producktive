import { string } from 'joi';
import mongoose, { Types } from 'mongoose';

export type Column = {
  id: string;
  title: string;
  tasks: string[];
};

export type Task = {
  id: string;
  title: string;
  content: string;
};

export interface BoardDocument extends mongoose.Document {
  tasks: Types.Map<Task>;
  columns: Types.Map<Column>;
  columnOrder: string[];
}

const columnSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String },
  tasks: { type: [String] },
});

const taskSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String },
  content: { type: String },
});

const boardSchema = new mongoose.Schema({
  tasks: {
    type: Map,
    of: taskSchema,
    default: {},
  },
  columns: {
    type: Map,
    of: columnSchema,
    default: {},
  },
  columnOrder: { type: [String] },
});

export default mongoose.model<BoardDocument>('Board', boardSchema);
