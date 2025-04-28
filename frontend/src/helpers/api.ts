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
    `${API_BASE}/books?query=${encodeURIComponent(
      query
    )}&search_by=${searchBy}&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  return response.json();
}

export async function fetchBook(
  id: string | undefined
): Promise<BookDetailsType | null> {
  if (!id) {
    return null;
  }
  const response = await fetch(`${API_BASE}/books/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  return response.json();
}

export async function login(credentials: Credentials): Promise<TokenResponse> {
  const formattedCredentials = new URLSearchParams();
  formattedCredentials.append("username", credentials.username);
  formattedCredentials.append("password", credentials.password);
  const response = await fetch(`${API_BASE}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formattedCredentials,
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  return await response.json();
}

export async function register(credentials: Credentials) {
  const response = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Failed to register");
  }

  return await response.json();
}

export async function addFavorite(book: BookType) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE}/favorites`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new Error("Failed to store book");
  }

  return await response.json();
}

export async function getFavorites(): Promise<BookType[]> {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE}/favorites`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  return await response.json();
}

export async function generateResponse(
  prompt: string
): Promise<GeminiResponse> {
  const response = await fetch(`${API_BASE}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate response");
  }

  return await response.json();
}
