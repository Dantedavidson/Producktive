import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user';
import listRouter from './routes/list';
import itemRouter from './routes/listItem';
import router from './routes/user';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoDB = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(mongoDB as string);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
router.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/list', listRouter);
app.use('/api/listItem', itemRouter);

app.listen('3001', (): void => {
  console.log('Server Running!');
});
