import express from 'express';
import { createList } from '../controllers/list';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, createList);

export default router;
