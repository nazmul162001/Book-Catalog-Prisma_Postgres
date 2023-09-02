import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();

router.post('/signup', UserController.createUser);
router.post('/signin', UserController.loginUser);

export const UserRoutes = router
