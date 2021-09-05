import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user';

dotenv.config();

const app = express();
app.use(express.json());

const mongoDB = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(mongoDB as string);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api/users', userRouter);

app.listen('3001', (): void => {
  console.log('Server Running!');
});
