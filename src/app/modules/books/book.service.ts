import { Book } from '@prisma/client';
import prisma from '../../../shared/prisma';

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
const getAllBooks = async () => {
  const books = await prisma.book.findMany({
    include: {
      category: true,
      reviews: true,
      orderBooks: true,
    },
  });
  return books;
};

export const BookService = {
  createBook,
  getAllBooks,
};
