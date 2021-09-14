import express from 'express';
import {
  createList,
  deleteList,
  updateList,
  updateListOrder,
  getLists,
} from '../controllers/list';
import { auth } from '../middleware/auth';

const router = express.Router();
router.get('/', auth, getLists);
router.post('/', auth, createList);
router.post('/delete', auth, deleteList);
router.post('/update', auth, updateList);
router.post('/reorder', auth, updateListOrder);

export default router;
