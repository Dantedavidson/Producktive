import express from 'express';
import { createUser,getUser } from '../controllers/user';

const router = express.Router();

router.post('/', createUser);

router.get('/',getUser)

export default router;
