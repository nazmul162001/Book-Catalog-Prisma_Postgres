import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BookFilterAbleFields, PriceSearchableFields } from './book.interface';
import { BookService } from './book.service';

// create book
const createBook = catchAsync(async (req: Request, res: Response) => {
  const book = await BookService.createBook(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully',
    data: book,
  });
});

// get all books
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  // filters
  const filters = pick(req.query, BookFilterAbleFields);
  const priceQuery = pick(req.query, PriceSearchableFields);
  const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);

  const books = await BookService.getAllBooks(filters, options, priceQuery);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully',
    meta: books.meta,
    data: books.data,
  });
});

// get single book
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await BookService.getSingleBook(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully',
    data: book,
  });
});

// get book by category id
const getBooksByCategoryId = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const books = await BookService.getBooksByCategoryId(categoryId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved by categoryId successfully',
    data: books,
  });
});

// update book
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  const book = await BookService.updateBook(id, body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data: book,
  });
});

// delete book
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await BookService.deleteBook(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
    data: book,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  getBooksByCategoryId,
  updateBook,
  deleteBook,
};
