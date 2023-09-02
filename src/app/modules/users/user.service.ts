import { User } from '@prisma/client';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginUser } from './user.interface';

// sign-up or create user
const createUser = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });

  return result;
};

// sign-in in login user
const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  const isUserExist = await prisma.user.findMany({
    where: {
      email: email,
      password: password,
    },
  });

  if (isUserExist === undefined || isUserExist === null || !isUserExist) {
    throw new Error('User Does Not Exist');
  }

  //create access token
  const { id, role } = isUserExist[0];
  const token = jwtHelpers.createToken(
    { id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    token,
  };
};

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
const getUserProfile = async (id: string, role: string) => {
  try {
    const user = await prisma.user.findMany({
      where: {
        id,
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        contactNo: true,
        address: true,
        profileImg: true,
      },
    });

    if (user) {
      return user;
    }
  } catch (error) {
    throw new Error('User Does Not Exist');
  }
};

export const UserService = {
  createUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  getUserProfile,
};
