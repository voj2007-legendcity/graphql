import { Schema, model, Document, Model } from 'mongoose';

export type TaskType = {
  name: string,
  priority: number,
}

export type InputCreate = {
  input: {
    name: string,
    priority: number
  }
}

export type InputUpdate = {
  input: {
    _id: string,
    name: string,
    priority: number
  }
}

export type InputID = {
  input: {
    _id: string
  }
}

export type InputFetch = {
  input: {
    condition: object
  }
}

export interface ITask extends Document {
  _doc: ITask | PromiseLike<ITask>;
  name: string,
  priority: number
}

export const Task: Model<ITask, {}> = model<ITask>('Task', new Schema(
  {
    name: {
      type: String,
      required: true
    },
    priority: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
));