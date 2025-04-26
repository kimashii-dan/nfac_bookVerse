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

type APIBookListType = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    imageLinks?: {
      thumbnail?: string;
    };
    averageRating: string;
  };
};

// type APIBookDetailsType = {
//   id: string;
//   volumeInfo: {
//     title: string;
//     description?: string;
//     authors?: string[];
//     publishedDate?: string;
//     imageLinks?: {
//       thumbnail?: string;
//     };
//     averageRating?: number;
//     ratingsCount?: number;
//   };
// };

type BookListType = {
  id: string;
  title: string;
  author: string;
  publishDate: string;
  image: string;
  averageRating?: number;
};

type BookToStore = {
  id: string;
  title: string;
  author: string;
  publish_date: string;
  image: string;
  average_rating?: number;
};

type BookDetailsType = {
  id: string;
  title: string;
  author: string;
  description: string;
  publishDate: string;
  image: string;
  averageRating: string;
  ratingsCount: string;
};

type Credentials = {
  username: string;
  password: string;
};

type TokenResponse = {
  access_token: string;
  username: string;
};

export type {
  BookToStore,
  TokenResponse,
  Credentials,
  Theme,
  ThemeProviderProps,
  ThemeProviderState,
  SearchParams,
  BookDetailsType,
  BookListType,
  APIBookListType,
};
