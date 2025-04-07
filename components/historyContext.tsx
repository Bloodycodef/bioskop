import React, { createContext, useContext, useState } from "react";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date?: string; 
  runtime?: number;
};

type HistoryContextType = {
  history: Movie[];
  addToHistory: (movie: Movie) => void;
};

const HistoryContext = createContext<HistoryContextType>({
  history: [],
  addToHistory: () => {},
});

export const HistoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [history, setHistory] = useState<Movie[]>([]);

  const addToHistory = (movie: Movie) => {
    // Hindari duplikat
    if (!history.some((item) => item.id === movie.id)) {
      setHistory([movie, ...history]);
    }
  };

  return (
    <HistoryContext.Provider value={{ history, addToHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => useContext(HistoryContext);
