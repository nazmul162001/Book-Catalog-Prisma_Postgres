import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
import ApiError from '../../../errors/ApiError';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const payload = { email, password };

  const result = await UserService.loginUser(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully !',
    data: result,
  });
});

// get all users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All users retrieved successfully',
    data: users,
  });
});

// get single user
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.getSingleUser(id);

  if (!user) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'User Not Found',
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: user,
  });
});

// update single user
const updateSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  const updateUser = await UserService.updateSingleUser(id, body);
  const user = await UserService.getSingleUser(id);

  if (!updateUser) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'User not found',
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Updated successfully',
    data: user,
  });
});

// delete single user
const deleteSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.getSingleUser(id);
  if (!user) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'User Does Not Exist',
      data: user,
    });
  }
  await UserService.deleteSingleUser(id);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Delete successfully',
    data: user,
  });
});


// get user profile 
const getUserProfile = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization

    let verifiedToken = null
    try {
      verifiedToken = jwtHelpers.verifyToken(
        token as string,
        config.jwt.secret as Secret
      )
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid access token')
    }

    const { id, role } = verifiedToken

    // Match the userPhoneNumber and role with the User collection
    const user = await UserService.getUserProfile(id, role)

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }

    sendResponse (res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User's information retrieved successfully",
      data: user,
    })
  }
)



export const UserController = {
  createUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  getUserProfile
};
