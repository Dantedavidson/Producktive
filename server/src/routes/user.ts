import express from 'express';
import {
  createUser,
  deleteAllUsers,
  deleteUser,
  getUser,
  loginUser,
} from '../controllers/user';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/', getUser);
router.delete('/', auth, deleteUser);
router.delete('/many', deleteAllUsers);

export default router;
