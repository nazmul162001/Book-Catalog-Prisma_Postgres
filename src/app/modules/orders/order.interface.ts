export type ICreateOrder = {
  userId: string,
  orderedBooks: { bookId: string; quantity: number }[];
}