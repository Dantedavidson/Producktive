import express from 'express';
import {
  createTask,
  deleteTask,
  updateTask,
  moveTask,
  deleteAllTasks,
  // reorderTask,
} from '../controllers/listItem';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, createTask);
router.delete('/delete', auth, deleteTask);
router.post('/update', auth, updateTask);
router.delete('/deleteAll', auth, deleteAllTasks);
router.post('/move', auth, moveTask);
export default router;
