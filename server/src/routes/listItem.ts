import express from 'express';
import { createTask } from '../controllers/listItem';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, createTask);

export default router;
