import express from 'express';
import {
  createList,
  deleteList,
  updateList,
  updateListOrder,
} from '../controllers/list';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, createList);
router.post('/delete', auth, deleteList);
router.post('/update', auth, updateList);
router.post('/reorder', auth, updateListOrder);

export default router;
