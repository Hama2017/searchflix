import type { MovieSearchResult } from '../types/Movie';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com';

export async function searchMovies(query: string): Promise<MovieSearchResult[]> {
  const response = await fetch(`${BASE_URL}/?s=${encodeURIComponent(query)}&type=movie&apikey=${API_KEY}`);

  if (!response.ok) throw new Error('Erreur réseau');

  const data = await response.json();

  if (data.Response === 'False') return [];

  return data.Search as MovieSearchResult[];
}
