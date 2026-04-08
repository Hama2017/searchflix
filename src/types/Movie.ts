// Résultat retourné par l'endpoint ?s= (recherche par mot-clé)
export interface MovieSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

// Résultat complet retourné par l'endpoint ?i=
export interface Movie {
  Title: string;
  Year: string;
  Rated: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
  imdbID: string;
  BoxOffice: string;
  Awards: string;
}
