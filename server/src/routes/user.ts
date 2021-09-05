import express from 'express';
import { createUser, getUser, loginUser } from '../controllers/user';

const router = express.Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/', getUser);

export default router;
