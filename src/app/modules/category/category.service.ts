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

// get single category
const getSingleCategory = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });
  return category;
};

// update category
const updateCategory = async (
  id: string,
  data: Partial<Category>
): Promise<Category> => {
  const updateCategory = await prisma.category.update({
    where: {
      id,
    },
    data,
  });
  return updateCategory;
};

// delete category
const deleteCategory = async (id: string) => {
  const category = await prisma.category.delete({
    where: {
      id,
    },
  });
  return category;
};

export const CategoryService = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
