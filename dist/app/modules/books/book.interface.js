"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceSearchableFields = exports.BookFilterAbleFields = exports.BookSearchAbleFields = void 0;
// for search
exports.BookSearchAbleFields = ['title', 'author', 'genre'];
// for filter
exports.BookFilterAbleFields = [
    'search',
    'title',
    'author',
    'genre',
    'price',
    'categoryId',
];
exports.PriceSearchableFields = ['maxPrice', 'minPrice'];
