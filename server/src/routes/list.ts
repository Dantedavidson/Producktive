import express from 'express';
import {
  createList,
  deleteList,
  updateList,
  updateListOrder,
  getLists,
  updateMany,
} from '../controllers/list';
import { auth } from '../middleware/auth';

const router = express.Router();
router.get('/', auth, getLists);
router.post('/', auth, createList);
router.delete('/:id', auth, deleteList);
router.post('/update', auth, updateList);
router.post('/updateMany', auth, updateMany);
router.post('/reorder', auth, updateListOrder);

export default router;
