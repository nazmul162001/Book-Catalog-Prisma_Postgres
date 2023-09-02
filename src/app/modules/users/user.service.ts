import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { ILoginUser } from './user.interface';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

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
    throw new Error("User Does Not Exist");
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

export const UserService = {
  createUser,
  loginUser,
  getAllUsers
};