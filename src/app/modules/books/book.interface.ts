export type IBookFilterRequest = {
  search?: string;
};

// for search
export const BookSearchAbleFields = ['title', 'author', 'genre'];

// for filter
export const BookFilterAbleFields = [
  'search',
  'title',
  'author',
  'genre',
  'price',
  'categoryId',
];


export type IPriceFilters = {
  maxPrice?: number
  minPrice?: number
}

export const PriceSearchableFields = ['maxPrice', 'minPrice']