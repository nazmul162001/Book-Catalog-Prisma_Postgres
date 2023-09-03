export type IBookFilterRequest = {
  searchTerm?: string;
};

// for search 
export const BookSearchAbleFields = ['title', 'author', 'genre'];

// for filter 
export const BookFilterAbleFields = [
  'searchTerm',
  'title',
  'author',
  'genre',
  'price',
  'categoryId',
];
