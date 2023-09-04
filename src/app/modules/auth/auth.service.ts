import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { jwtHelpers } from "../../../helpers/jwtHelpers";


const insertIntoDB = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};

const login = async (data: Partial<User>): Promise<string> => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.password !== data.password) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Incorrect Credentials');
  }

  const result = jwtHelpers.createToken(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    '1y'
  );

  return result;
};

export const AuthService = {
  insertIntoDB,
  login,
};
