import { searchMovies } from '../../services/omdb';
import type { MovieSearchResult } from '../../types/Movie';

export async function handleSearch(
  query: string,
  setResults: (results: MovieSearchResult[]) => void,
  setLoading: (loading: boolean) => void
) {
  setLoading(true);
  const results = await searchMovies(query);
  setResults(results);
  setLoading(false);
}
