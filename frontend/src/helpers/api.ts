import {
  BookDetailsType,
  BookType,
  Credentials,
  GeminiResponse,
  SearchParams,
  SearchResponse,
  TokenResponse,
} from "../types";

const API_BASE = import.meta.env.VITE_API_BASE;

export async function fetchBooks(
  params: Required<SearchParams>
): Promise<SearchResponse> {
  const { query, searchBy, page } = params;
  if (!query || !searchBy || !page) {
    return {
      books: null,
      total_books: 0,
    };
  }
  const response = await fetch(
    `${API_BASE}/books/?query=${encodeURIComponent(
      query
    )}&search_by=${searchBy}&page=${page}`
  );

  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.detail || "Failed to fetch books");
    error.name = response.status.toString();
    throw error;
  }

  return response.json();
}

export async function fetchBook(id: string): Promise<BookDetailsType> {
  console.log("api", id);
  const response = await fetch(`${API_BASE}/books/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.detail || "Failed to fetch book");
    error.name = response.status.toString();
    throw error;
  }

  return response.json();
}

export async function login(credentials: Credentials): Promise<TokenResponse> {
  const formattedCredentials = new URLSearchParams();
  formattedCredentials.append("username", credentials.username);
  formattedCredentials.append("password", credentials.password);
  const response = await fetch(`${API_BASE}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formattedCredentials,
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.detail || "Failed to login");
    error.name = response.status.toString();
    throw error;
  }

  return await response.json();
}

export async function register(credentials: Credentials) {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.detail || "Failed to register");
    error.name = response.status.toString();
    throw error;
  }

  return await response.json();
}

export async function addFavorite(book: BookType) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE}/books/favorites`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.detail || "Failed to store book");
    error.name = response.status.toString();
    throw error;
  }

  return await response.json();
}

export async function getFavorites(): Promise<BookType[]> {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE}/books/favorites`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.detail || "Failed to get favorites");
    error.name = response.status.toString();
    throw error;
  }

  return await response.json();
}

export async function generateResponse(
  prompt: string
): Promise<GeminiResponse> {
  const response = await fetch(`${API_BASE}/gemini/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.detail || "Failed to generate response");
    error.name = response.status.toString();
    throw error;
  }

  return await response.json();
}
