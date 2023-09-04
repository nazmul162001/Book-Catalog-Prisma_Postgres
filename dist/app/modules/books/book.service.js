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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const book_interface_1 = require("./book.interface");
// create book
const createBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.default.book.create({
        data: Object.assign({}, data),
        include: {
            category: true,
        },
    });
    return book;
});
// get all books
const getAllBooks = (filters, options, priceQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search } = filters, filtersData = __rest(filters, ["search"]);
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
    }
    else if (priceQuery.minPrice !== undefined) {
        const minPrice = Number(priceQuery.minPrice);
        if (!isNaN(minPrice)) {
            andConditions.push({
                price: {
                    gte: minPrice,
                },
            });
        }
    }
    else if (priceQuery.maxPrice !== undefined) {
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
            OR: book_interface_1.BookSearchAbleFields.map(field => ({
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
                    equals: filtersData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const books = yield prisma_1.default.book.findMany({
        where: whereConditions,
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
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
    const total = yield prisma_1.default.book.count();
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
});
// get single book
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });
    return book;
});
// get book by category id
const getBooksByCategoryId = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield prisma_1.default.book.findMany({
        where: {
            categoryId,
        },
        include: {
            category: true,
        },
    });
    return books;
});
// update book
const updateBook = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.default.book.update({
        where: {
            id,
        },
        data,
    });
    return book;
});
// delete book
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.default.book.delete({
        where: {
            id,
        },
    });
    return book;
});
exports.BookService = {
    createBook,
    getAllBooks,
    getSingleBook,
    getBooksByCategoryId,
    updateBook,
    deleteBook,
};
