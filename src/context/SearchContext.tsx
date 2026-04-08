import { createContext, useState, useContext, useRef } from 'react';
import { searchMovies, getMovieById } from '../services/omdb';
import type { Movie, MovieSearchResult } from '../types/Movie';

interface SearchContextValue {
  results: MovieSearchResult[] | null;
  loading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
  getMovie: (imdbID: string) => Promise<Movie>;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {

  const [results, setResults] = useState<MovieSearchResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchCache = useRef<Map<string, MovieSearchResult[]>>(new Map());
  const movieCache = useRef<Map<string, Movie>>(new Map());

  async function search(query: string) {
    const key = query.toLowerCase().trim();

    if (searchCache.current.has(key)) {
      setResults(searchCache.current.get(key)!);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await searchMovies(query);
      searchCache.current.set(key, data);
      setResults(data);
    } catch {
      setError('Une erreur est survenue. Vérifie ta connexion et réessaie.');
    } finally {
      setLoading(false);
    }
  }

  async function getMovie(imdbID: string): Promise<Movie> {
    if (movieCache.current.has(imdbID)) {
      return movieCache.current.get(imdbID)!;
    }

    const movie = await getMovieById(imdbID);
    movieCache.current.set(imdbID, movie);
    return movie;
  }

  return (
    <SearchContext.Provider value={{ results, loading, error, search, getMovie }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearch doit être utilisé dans un SearchProvider');
  return ctx;
}
