import { loginUser, createUser } from '../controllers/userController.js';
import { Router } from 'express';

const router = Router();

router.post('/sign-up', createUser);
router.post('/login', loginUser);

export default router;