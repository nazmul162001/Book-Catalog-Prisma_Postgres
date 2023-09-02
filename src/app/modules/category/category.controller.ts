import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

// create category
const createCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await CategoryService.createCategory(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successfully',
    data: category,
  });
});

// get all category
const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await CategoryService.getAllCategory();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category retrieved successfully',
    data: category,
  });
});

// get single category
const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await CategoryService.getSingleCategory(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category retrieved successfully',
    data: category,
  });
});

// update category
const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  const updateCategory = await CategoryService.updateCategory(id, body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully',
    data: updateCategory,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
};
