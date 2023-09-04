import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

// get all users
const getAllUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany();
  return users;
};

// get single user
const getSingleUser = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

// update single user
const updateSingleUser = async (
  id: string,
  data: Partial<User>
): Promise<User | null> => {
  const updateUser = await prisma.user.update({
    where: {
      id,
    },
    data,
  });
  return updateUser;
};

// delete Single user
const deleteSingleUser = async (id: string): Promise<User | null> => {
  const deleteUser = await prisma.user.delete({
    where: {
      id,
    },
  });
  return deleteUser;
};

// get user profile
const getUserProfile = async (id: string): Promise<User> => {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Profile not found');
  }

  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  getUserProfile,
};
