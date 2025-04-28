type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

type SearchParams = {
  query?: string;
  searchBy?: "title" | "author";
  page?: number;
};

type BookType = {
  id: string;
  title: string;
  author: string;
  publish_date: string;
  image: string;
  average_rating: number;
};

type SearchResponse = {
  books: BookType[] | null;
  total_books: number;
};

type BookDetailsType = BookType & {
  description: string;
  ratings_count: string;
};

type Credentials = {
  username: string;
  password: string;
};

type TokenResponse = {
  access_token: string;
  username: string;
};

type BookTitle = {
  title: string;
  id: string;
};

type GeminiResponse = {
  main_text: string;
  books: BookTitle[];
};

type ChatMessage = {
  role: "user" | "libryan";
  content: string | GeminiResponse;
};

export type {
  GeminiResponse,
  ChatMessage,
  SearchResponse,
  BookType,
  TokenResponse,
  Credentials,
  Theme,
  ThemeProviderProps,
  ThemeProviderState,
  SearchParams,
  BookDetailsType,
};
