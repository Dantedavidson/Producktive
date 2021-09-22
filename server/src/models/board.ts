import Joi from 'joi';
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
  status: boolean;
};

export interface BoardDetails {
  tasks: Types.Map<Task>;
  columns: Types.Map<Column>;
  columnOrder: string[];
}

export interface BoardDocument extends mongoose.Document, BoardDetails {}

const columnSchema = new mongoose.Schema(
  {
    id: { type: String },
    title: { type: String },
    tasks: { type: [String] },
  },
  { _id: false }
);

const taskSchema = new mongoose.Schema(
  {
    id: { type: String },
    title: { type: String },
    content: { type: String },
    status: { type: Boolean },
  },
  { _id: false }
);

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

const columnValidationSchema = Joi.object({
  id: Joi.string(),
  title: Joi.string().required(),
  tasks: Joi.array().items(Joi.string()),
});

export const validateColumn = (column: any) => {
  return columnValidationSchema.validate(column);
};

const taskValidationSchema = Joi.object({
  id: Joi.string(),
  title: Joi.string().required(),
  content: Joi.string().allow(''),
  status: Joi.boolean(),
});
export const validateTask = (task: any) => taskValidationSchema.validate(task);

const columnOrderValidationSchema = Joi.object({
  columnOrder: Joi.array().items(Joi.string()).required(),
});
export const validateColumnOrder = (columnOrder: string[]) =>
  columnOrderValidationSchema.validate(columnOrder);

export const validateBoard = (board: any) => {
  const schema = Joi.object({
    tasks: Joi.object().pattern(Joi.string(), taskValidationSchema),
    columns: Joi.object().pattern(Joi.string(), columnValidationSchema),
    columnOrder: columnOrderValidationSchema,
  });
  return schema.validate(board);
};

export default mongoose.model<BoardDocument>('Board', boardSchema);
