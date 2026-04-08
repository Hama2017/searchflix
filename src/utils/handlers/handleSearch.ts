import { searchMovies } from '../../services/omdb';
import type { MovieSearchResult } from '../../types/Movie';

export async function handleSearch(query: string, setResults: (results: MovieSearchResult[]) => void) {
  const results = await searchMovies(query);
  setResults(results);
}
