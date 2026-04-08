// Résultat retourné par l'endpoint ?s= (recherche par mot-clé)
export interface MovieSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}
