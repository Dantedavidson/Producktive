import express from 'express';
import {
  createTask,
  deleteTask,
  updateTask,
  moveTask,
  reorderTask,
} from '../controllers/listItem';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, createTask);
router.post('/delete', auth, deleteTask);
router.post('/update', auth, updateTask);
router.post('/reorder', auth, reorderTask);
router.post('/move', auth, moveTask);
export default router;
