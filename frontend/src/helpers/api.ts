import {
  BookDetailsType,
  BookType,
  Credentials,
  GeminiResponse,
  SearchParams,
  SearchResponse,
  TokenResponse,
} from "../types";
import { apiClient } from "./interceptor";

export async function fetchBooks(
  params: Required<SearchParams>
): Promise<SearchResponse> {
  const { query, searchBy, page } = params;
  if (!query || !searchBy || !page) {
    return { books: null, total_books: 0 };
  }

  const response = await apiClient.get<SearchResponse>("/books/", {
    params: {
      query: encodeURIComponent(query),
      search_by: searchBy,
      page,
    },
  });
  return response.data;
}

export async function fetchBook(id: string): Promise<BookDetailsType> {
  const response = await apiClient.get<BookDetailsType>(`/books/${id}`);
  return response.data;
}

export async function login(credentials: Credentials): Promise<TokenResponse> {
  const formData = new URLSearchParams();
  formData.append("username", credentials.username);
  formData.append("password", credentials.password);

  const response = await apiClient.post<TokenResponse>(
    "/auth/token",
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data;
}

export async function register(credentials: Credentials) {
  await apiClient.post("/auth/register", credentials);
}

export async function addFavorite(book: BookType): Promise<void> {
  await apiClient.post("/books/favorites", book);
}

export async function logout() {
  await apiClient.post("/auth/logout");
}

export async function getFavorites(): Promise<BookType[]> {
  const response = await apiClient.get<BookType[]>("/books/favorites");
  return response.data;
}

export async function generateResponse(
  prompt: string
): Promise<GeminiResponse> {
  const response = await apiClient.post<GeminiResponse>("/gemini/generate", {
    prompt,
  });
  return response.data;
}
