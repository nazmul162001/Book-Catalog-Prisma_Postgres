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
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertIntoDB = (data, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield transaction.order.create({
            data: {
                userId: userData.userId,
            },
        });
        for (const index of data.orderedBooks) {
            yield transaction.orderedBook.create({
                data: {
                    bookId: index.bookId,
                    orderId: order.id,
                    quantity: index.quantity,
                },
            });
        }
        const result = yield transaction.order.findUnique({
            where: {
                id: order.id,
            },
            include: {
                orderedBooks: true,
            },
        });
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Something went wrong');
        }
        return result;
    }));
    return result;
});
const getAllOrders = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const whereConditions = user.role === 'admin' ? {} : { userId: user.userId };
    const result = yield prisma_1.default.order.findMany({
        where: whereConditions,
        include: {
            orderedBooks: true,
        },
    });
    return result;
});
const getSingleOrder = (orderId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const whereConditions = user.role === 'admin'
        ? { id: orderId }
        : { id: orderId, userId: user.userId };
    const result = yield prisma_1.default.order.findUnique({
        where: whereConditions,
        include: {
            orderedBooks: true,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Order not found or unauthorized');
    }
    return result;
});
exports.OrderService = {
    insertIntoDB,
    getAllOrders,
    getSingleOrder,
};
