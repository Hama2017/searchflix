import { describe, it, expect, vi, beforeEach } from 'vitest';
import { searchMovies, getMovieById } from './omdb';

const mockSearchResult = {
  Search: [
    { Title: 'Inception', Year: '2010', imdbID: 'tt1375666', Type: 'movie', Poster: 'https://example.com/inception.jpg' },
    { Title: 'Interstellar', Year: '2014', imdbID: 'tt0816692', Type: 'movie', Poster: 'N/A' },
  ],
  totalResults: '2',
  Response: 'True',
};

const mockMovie = {
  Title: 'Inception',
  Year: '2010',
  Rated: 'PG-13',
  Runtime: '148 min',
  Genre: 'Action, Adventure, Sci-Fi',
  Director: 'Christopher Nolan',
  Actors: 'Leonardo DiCaprio',
  Plot: 'A thief who steals corporate secrets...',
  Poster: 'https://example.com/inception.jpg',
  imdbRating: '8.8',
  imdbID: 'tt1375666',
  BoxOffice: '$292,576,195',
  Awards: 'Won 4 Oscars',
  Response: 'True',
};

beforeEach(() => {
  vi.restoreAllMocks();
});

// --- searchMovies ---

describe('searchMovies', () => {

  it('retourne la liste des films si la réponse est valide', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockSearchResult),
    }));

    const results = await searchMovies('inception');

    expect(results).toHaveLength(2);
    expect(results[0].Title).toBe('Inception');
    expect(results[1].imdbID).toBe('tt0816692');
  });

  it('retourne un tableau vide si Response est False', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ Response: 'False', Error: 'Movie not found!' }),
    }));

    const results = await searchMovies('xxxxxxinconnu');

    expect(results).toEqual([]);
  });

  it('lance une erreur si la réponse réseau est ko', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
    }));

    await expect(searchMovies('inception')).rejects.toThrow('Erreur réseau');
  });

  it('lance une erreur si fetch rejette (pas de connexion)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));

    await expect(searchMovies('inception')).rejects.toThrow();
  });

});

// --- getMovieById ---

describe('getMovieById', () => {

  it('retourne les détails complets du film', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockMovie),
    }));

    const movie = await getMovieById('tt1375666');

    expect(movie.Title).toBe('Inception');
    expect(movie.Director).toBe('Christopher Nolan');
    expect(movie.imdbRating).toBe('8.8');
  });

  it('lance une erreur si la réponse réseau est ko', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
    }));

    await expect(getMovieById('tt1375666')).rejects.toThrow('Erreur réseau');
  });

});
