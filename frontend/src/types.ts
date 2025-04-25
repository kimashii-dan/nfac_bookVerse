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
  date: string;
  image: string;
  averageRating: number;
};

type BookDetailsType = {
  id: string;
  title: string;
  author: string;
  description: string;
  date: string;
  image: string;
  averageRating: string;
  ratingsCount: string;
};

export type {
  Theme,
  ThemeProviderProps,
  ThemeProviderState,
  SearchParams,
  BookDetailsType,
  BookListType,
  APIBookListType,
};
