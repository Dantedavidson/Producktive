import express from 'express';
import { createList, deleteList, updateList } from '../controllers/list';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, createList);
router.post('/delete', auth, deleteList);
router.post('/update', auth, updateList);

export default router;
