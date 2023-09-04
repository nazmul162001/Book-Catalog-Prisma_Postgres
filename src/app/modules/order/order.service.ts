import { Order, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IOrderedBooksRequest } from './order.interface';

const insertIntoDB = async (
  data: IOrderedBooksRequest,
  userData: JwtPayload
): Promise<Order> => {
  const result = await prisma.$transaction(async transaction => {
    const order = await transaction.order.create({
      data: {
        userId: userData.userId,
      },
    });

    for (const index of data.orderedBooks) {
      await transaction.orderedBook.create({
        data: {
          bookId: index.bookId,
          orderId: order.id,
          quantity: index.quantity,
        },
      });
    }

    const result = await transaction.order.findUnique({
      where: {
        id: order.id,
      },
      include: {
        orderedBooks: true,
      },
    });

    if (!result) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Something went wrong'
      );
    }

    return result;
  });

  return result;
};

const getAllOrders = async (user: JwtPayload): Promise<Order[]> => {
  const whereConditions: Prisma.OrderWhereInput =
    user.role === 'admin' ? {} : { userId: user.userId };

  const result = await prisma.order.findMany({
    where: whereConditions,
    include: {
      orderedBooks: true,
    },
  });

  return result;
};

const getSingleOrder = async (
  orderId: string,
  user: JwtPayload
): Promise<Order> => {
  const whereConditions: Prisma.OrderWhereInput =
    user.role === 'admin'
      ? { id: orderId }
      : { id: orderId, userId: user.userId };

  const result = await prisma.order.findUnique({
    where: whereConditions as Prisma.OrderWhereUniqueInput,
    include: {
      orderedBooks: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found or unauthorized');
  }

  return result;
};

export const OrderService = {
  insertIntoDB,
  getAllOrders,
  getSingleOrder,
};
