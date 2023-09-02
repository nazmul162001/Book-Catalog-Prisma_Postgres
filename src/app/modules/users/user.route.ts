import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';
const router = express.Router();

// user routes
router.get('/users', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);
router.get(
  '/users/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.getSingleUser
);

router.patch(
  '/users/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateSingleUser
);

// authentication
router.post('/signup', UserController.createUser);
router.post('/signin', UserController.loginUser);

export const UserRoutes = router;
