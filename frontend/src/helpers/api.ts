import { BookDetailsType, BookListType, SearchParams } from "../types";

const API_BASE = import.meta.env.VITE_API_BASE;

export const fetchBooks = async (
  params: Required<SearchParams>
): Promise<{ books: BookListType[] | null; totalBooks: number }> => {
  const { query, searchBy, page } = params;
  if (!query || !searchBy || !page) {
    return {
      books: null,
      totalBooks: 0,
    };
  }
  const response = await fetch(
    `${API_BASE}/books?query=${encodeURIComponent(
      query
    )}&search_by=${searchBy}&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  return response.json();
};

export const fetchBook = async (
  id: string | undefined
): Promise<BookDetailsType | null> => {
  if (!id) {
    return null;
  }
  const response = await fetch(`${API_BASE}/books/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  return response.json();
};
