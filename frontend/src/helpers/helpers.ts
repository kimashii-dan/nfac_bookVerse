import { APIBookListType, BookListType } from "../types";

export async function findAPIBooks(
  query: string | undefined,
  searchBy: string = "title",
  page: number = 1
): Promise<{ books: BookListType[] | null; totalBooks: number }> {
  if (!query) return { books: null, totalBooks: 0 };

  const limit = 6;
  const offset = (page - 1) * limit;

  try {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    if (!apiKey) throw new Error("Google API key not configured");

    const apiUrl = new URL("https://www.googleapis.com/books/v1/volumes");

    apiUrl.search = new URLSearchParams({
      q: `in${searchBy}:${query}`,
      startIndex: offset.toString(),
      maxResults: `${limit}`,
      fields:
        "items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/publishedDate,volumeInfo/imageLinks/thumbnail,volumeInfo/averageRating),totalItems",
      key: apiKey,
    }).toString();

    const response = await fetch(apiUrl.toString());

    if (!response.ok)
      throw new Error(`API request failed: ${response.statusText}`);

    const { items, totalItems } = await response.json();

    if (!items) {
      return { books: null, totalBooks: 0 };
    }

    const books = items.map((book: APIBookListType) => {
      const volumeInfo = book.volumeInfo;
      const publishedYear = volumeInfo.publishedDate?.split("-")[0] || "0000";

      return {
        id: book.id,
        title: volumeInfo.title || "Unknown Title",
        author: volumeInfo.authors?.[0] || "Unknown Author",
        publishDate: publishedYear,
        image:
          volumeInfo.imageLinks?.thumbnail?.replace(/^http:/i, "https:") ||
          "/images/cover.jpg",
        averageRating: volumeInfo.averageRating,
      };
    });

    return {
      books,
      totalBooks: totalItems,
    };
  } catch (error) {
    console.error("Error in findBooksByTitle:", error);
    return { books: null, totalBooks: 0 };
  }
}
