import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

// create category
const createCategory = async (data: Category): Promise<Category> => {
  const category = await prisma.category.create({
    data,
  });
  return category;
};

// get all category
const getAllCategory = async () => {
  const category = await prisma.category.findMany();
  return category;
};

export const CategoryService = {
  createCategory,
  getAllCategory,
};
