"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// get all users
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma_1.default.user.findMany();
    return users;
});
// get single user
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
    });
    return user;
});
// update single user
const updateSingleUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const updateUser = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data,
    });
    return updateUser;
});
// delete Single user
const deleteSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteUser = yield prisma_1.default.user.delete({
        where: {
            id,
        },
    });
    return deleteUser;
});
// get user profile
const getUserProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id: id,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Profile not found');
    }
    return result;
});
exports.UserService = {
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
    getUserProfile,
};
