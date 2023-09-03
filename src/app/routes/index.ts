import express from 'express';
import { BookRoutes } from '../modules/books/book.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { UserRoutes } from '../modules/users/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/',
    route: UserRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
