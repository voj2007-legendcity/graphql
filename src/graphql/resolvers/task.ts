import i18n  from 'i18n';
import validator from 'validator';
// errors
import { ErrorHelper } from '../../helpers/ErrorHelper';
// model
import { ITask, Task, InputCreate, InputUpdate, InputID, InputFetch } from '../../models/task';

const ITEMS_PER_PAGE: number = 1;

export default {
  createTask: async ({ input }: InputCreate): Promise<ITask> => {
    try{
      if(validator.isEmpty(input.name) || !validator.isLength(input.name, { min: 4, max: 255 })){
        throw new ErrorHelper(i18n.__('ERROR_500'), 500, [{ message: i18n.__('TASK_NAME_IS_INCORECT', { name: input.name }), field: 'name' }]);
      }

      if(validator.isEmpty(input.priority.toString()) || !validator.isNumeric(input.priority.toString()) || !validator.isInt(input.priority.toString(), { min: 0, max: 100 })){
        throw new ErrorHelper(i18n.__('ERROR_500'), 500, [{ message: i18n.__('TASK_PRIORITY_IS_INCORECT'), field: 'priority' }]);
      }

      const task: ITask = new Task({
        name: input.name,
        priority: input.priority
      });
      const createdTask: ITask = await task.save();
      return { ...<PromiseLike<ITask>>createdTask._doc, _id: createdTask.id };

    }catch(err){
      throw err;
    }
  },

  updateTask: async ({ input }: InputUpdate): Promise<ITask> => {
    try{
      if(validator.isEmpty(input._id)){
        throw new ErrorHelper(i18n.__('ERROR_500'), 500, [{ message: i18n.__('TASK_ID_IS_INVALID') }]);
      }

      if(validator.isEmpty(input.name) || !validator.isLength(input.name, { min: 4, max: 255 })){
        throw new ErrorHelper(i18n.__('ERROR_500'), 500, [{ message: i18n.__('TASK_NAME_IS_INCORECT', { name: input.name }), field: 'name' }]);
      }

      if(validator.isEmpty(input.priority.toString()) || !validator.isNumeric(input.priority.toString()) || !validator.isInt(input.priority.toString(), { min: 0, max: 100 })){
        throw new ErrorHelper(i18n.__('ERROR_500'), 500, [{ message: i18n.__('TASK_PRIORITY_IS_INCORECT'), field: 'priority' }]);
      }

      const task: ITask = <ITask>await Task.findById(input._id);

      if(!task){
        throw new ErrorHelper(i18n.__('ERROR_500'), 500, [{ message: i18n.__('TASK_DOES_NOT_EXISTS') }]);
      }

      task.name = input.name;
      task.priority = input.priority;
  
      const updatedTask: ITask = await task.save();
      return { ...<PromiseLike<ITask>>updatedTask._doc };

    }catch(err){
      throw err;
    }

  },

  deleteTask: async ({ input }: InputID): Promise<boolean> => {
    try{
      if(validator.isEmpty(input._id)){
        throw new ErrorHelper(i18n.__('ERROR_500'), 500, [{ message: i18n.__('TASK_ID_IS_INVALID') }]);
      }

      const task: ITask = <ITask>await Task.findById(input._id);
      
      if(!task){
        throw new ErrorHelper(i18n.__('ERROR_500'), 500, [{ message: i18n.__('TASK_DOES_NOT_EXISTS') }]);
      }

      await Task.deleteOne({ _id: task._id });
      return true;

    }catch(err){
      throw err;
    }

  },

  readTask: async ({ input }: InputID): Promise<ITask> => {
    try{
      if(validator.isEmpty(input._id)){
        throw new ErrorHelper(i18n.__('ERROR_500'), 500, [{ message: i18n.__('TASK_ID_IS_INVALID') }]);
      }

      const task: ITask = <ITask>await Task.findById(input._id);
      
      if(!task){
        throw new ErrorHelper(i18n.__('ERROR_500'), 500, [{ message: i18n.__('TASK_DOES_NOT_EXISTS') }]);
      }

      return { ...<PromiseLike<ITask>>task._doc };

    }catch(err){
      throw err;
    }

  },

  fetchTasks: async ({ input }: InputFetch): Promise<ITask[]> => {
    try{
      const tasks: ITask[] = <ITask[]>await Task.find().limit(ITEMS_PER_PAGE).sort({ priority: -1 });
      return tasks.map((task: ITask): ITask => {
        return { ...<any>task._doc };
      });
    }catch(err){
      throw err;
    }
  }

}