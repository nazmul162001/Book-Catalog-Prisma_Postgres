import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookController } from './book.controller';
const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), BookController.getAllBooks);
router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.createBook
);

export const BookRoutes = router;
