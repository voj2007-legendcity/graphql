import "mocha";
import mongoose from 'mongoose';
import chai, { expect } from 'chai';
import { Task, ITask, TaskType } from '../models/task';

const MONGO_URI: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-m673t.mongodb.net/${process.env.MONGO_DATABASE}`;

chai.should();

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }); 
mongoose.connection
  .once('open', () => console.log('Connected!'))
  .on('error', (error: Error) => {
      console.warn('Error : ',error);
  });

// beforeEach((done) => {
//   mongoose.connection.collections.tasks.drop(() => {
//       done();
//   }); 
// });

let _id: string = '';

describe("Task", function() {
  describe("create()", function () {
    it("should create a new Task", function (done) {
      
      const newTask: TaskType = {
        name: "TEST Task 4",
        priority: 9,
      };
      
      new Task(newTask).save()
      .then((task: ITask): void => {
        expect(task.id).not.null;
        done();
      })
      .catch((err: Error) => {
        done(err);
      });
      
    });
  });

  describe("update()", function () {
    it("should update a Task", function (done) {

      const updatedTask: TaskType = {
        name: "NEW Task 55",
        priority: 99,
      }; 

      Task.findOne()
      .then((task: ITask | null): Promise<ITask> => {
        expect(task!.id).not.null;
        task!.name = updatedTask.name;
        task!.priority = updatedTask.priority;
        return task!.save();
      })
      .then((task: ITask): void => {
        expect(task.id).not.null;
        done();
      })
      .catch((err: Error): void => {
        done(err);
      });
      
    });
  });

  describe("read()", function () {
    it("should read a Task", function (done) {

      Task.findOne()
      .then((task: ITask | null): void => {
        expect(task!.id).not.null;
        _id = task!._id;
        done();
      })
      .catch((err: Error): void => {
        done(err);
      });
      
    });
  });

  describe("delete()", function () {
    it("should delete a Task", function (done) {

      Task.deleteOne({ _id: _id})
      .then((): void => {
        done();
      })
      .catch((err: Error): void => {
        done(err);
      });
      
    });
  });


});
