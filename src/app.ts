import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose, { Mongoose } from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
// middlewares
import graphql from './middlewares/graphql';
import i18 from './middlewares/i18';

const PORT: string | number = process.env.PORT || 5000;
const MONGO_URI: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-m673t.mongodb.net/${process.env.MONGO_DATABASE}`;

const app: Application = express();

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(i18);
app.use(process.env.API_VERSION_PATH + '/graphql', graphql);
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.statusCode || 404;
  const message = error.message;
  const data = error.data;
  
  res.status(status).json({ message: message, data: data });
});

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, { useNewUrlParser: true })
  .then((res: Mongoose) => {
    app.listen(PORT, () => console.log('Server is running'));
  })
  .catch((err: Error) => console.log(err));