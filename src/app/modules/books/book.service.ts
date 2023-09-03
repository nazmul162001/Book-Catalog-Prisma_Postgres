import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  BookSearchAbleFields,
  IBookFilterRequest,
  IPriceFilters,
} from './book.interface';

// create book
const createBook = async (data: Book): Promise<Book | null> => {
  const book = await prisma.book.create({
    data: {
      ...data,
    },
    include: {
      category: true,
      reviews: true,
      orderBooks: true,
    },
  });
  return book;
};

// get all books
const getAllBooks = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions,
  priceQuery: IPriceFilters
): Promise<IGenericResponse<Book[]>> => {
  const { page, size, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filtersData } = filters;

  const andConditions = [];

  // price query

  if (priceQuery.minPrice !== undefined && priceQuery.maxPrice !== undefined) {
    const minPrice = Number(priceQuery.minPrice);
    const maxPrice = Number(priceQuery.maxPrice);

    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      andConditions.push({
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
      });
    }
  } else if (priceQuery.minPrice !== undefined) {
    const minPrice = Number(priceQuery.minPrice);

    if (!isNaN(minPrice)) {
      andConditions.push({
        price: {
          gte: minPrice,
        },
      });
    }
  } else if (priceQuery.maxPrice !== undefined) {
    const maxPrice = Number(priceQuery.maxPrice);

    if (!isNaN(maxPrice)) {
      andConditions.push({
        price: {
          lte: maxPrice,
        },
      });
    }
  }

  // price query

  if (search) {
    andConditions.push({
      OR: BookSearchAbleFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const books = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            // createdAt: 'desc',
          },
  });

  // include: {
  //   category: true,
  //   reviews: true,
  //   orderBooks: true,
  // },

  const total = await prisma.book.count();
  const totalPage = Math.ceil(total / size);
  return {
    meta: {
      total,
      page,
      size,
      totalPage,
    },
    data: books,
  };
};

// get single book
const getSingleBook = async (id: string) => {
  const book = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      reviews: true,
      orderBooks: true,
    },
  });
  return book;
};

// get book by category id
const getBooksByCategoryId = async (categoryId: string) => {
  const books = await prisma.book.findMany({
    where: {
      categoryId,
    },
    include: {
      category: true,
      reviews: true,
      orderBooks: true,
    },
  });
  return books;
};

// update book
const updateBook = async (
  id: string,
  data: Partial<Book>
): Promise<Book | null> => {
  const book = await prisma.book.update({
    where: {
      id,
    },
    data,
  });
  return book;
};

// delete book
const deleteBook = async (id: string) => {
  const book = await prisma.book.delete({
    where: {
      id,
    },
  });
  return book;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  getBooksByCategoryId,
  updateBook,
  deleteBook,
};
