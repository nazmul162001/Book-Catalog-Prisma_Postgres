export type IOrderedBooksRequest = {
  orderedBooks: {
    bookId: string;
    quantity: number;
  }[];
};
