import express from 'express';
import { UserController } from '../modules/users/user.controller';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserController.createUser,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
