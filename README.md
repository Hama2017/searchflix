<p align="center">
  <img src="./public/images/logo.png" alt="SearchFlix Logo" height="80" />
</p>

<h1 align="center">SearchFlix</h1>

<p align="center">
  Application React de recherche de films propulsée par l'API OMDb.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript" />
  <img src="https://img.shields.io/badge/MUI-9.0-007FFF?style=flat-square&logo=mui" />
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite" />
</p>

---

## Fonctionnalités

- Recherche de films en temps réel via l'[API OMDb](https://www.omdbapi.com)
- Affichage des résultats en cards avec poster, titre et année
- Modal de détails par film (synopsis complet, réalisateur, acteurs, box office)
- Cache des requêtes API pour éviter les appels redondants
- Skeleton loading pendant les requêtes
- Gestion des erreurs réseau
- Page 404 animée avec compte à rebours
- Design système rouge/noir inspiré de Netflix
- Animation typewriter sur le logo
- Accessibilité ARIA (rôles, labels, aria-hidden)

---

## Stack technique

| Technologie | Version | Usage |
|---|---|---|
| React | 19 | UI & gestion d'état |
| TypeScript | 6.0 | Typage statique |
| MUI (Material UI) | 9.0 | Composants & design system |
| Vite | 8.0 | Bundler & dev server |
| OMDb API | — | Source de données films |

---

## Installation

```bash
# Cloner le projet
git clone <url-du-repo>
cd searchflix

# Installer les dépendances
npm install

# Configurer la clé API
cp .env.example .env
# Renseigner VITE_OMDB_API_KEY dans .env

# Lancer le serveur de développement
npm run dev
```

---

## Configuration

Créer un fichier `.env` à la racine du projet :

```env
VITE_OMDB_API_KEY=ta_cle_api
```

> Obtenir une clé gratuite sur [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)

---

## Architecture

```
src/
├── components/              # Composants React
│   ├── IconMarquee.tsx      # Défilement d'icônes animées dans la navbar
│   ├── MovieModal.tsx       # Modal de détails d'un film
│   ├── Navbar.tsx           # Barre de navigation
│   ├── NotFound.tsx         # Page aucun résultat + compte à rebours
│   ├── ResultsList.tsx      # Grille de cards de films
│   ├── ResultsSkeleton.tsx  # Skeleton de chargement
│   └── SearchBar.tsx        # Barre de recherche
│
├── context/
│   └── SearchContext.tsx    # État global + cache (recherches & détails)
│
├── hooks/
│   └── useTypewriter.ts     # Hook animation typewriter
│
├── services/
│   └── omdb.ts              # Appels API OMDb (searchMovies, getMovieById)
│
├── types/
│   └── Movie.ts             # Interfaces TypeScript (Movie, MovieSearchResult)
│
├── utils/
│   └── handlers/
│       └── handleSearch.ts  # Handler de recherche
│
├── App.tsx                  # Composant racine
├── main.tsx                 # Point d'entrée
├── theme.ts                 # Thème MUI (rouge #E50914 / noir #141414)
└── index.css                # Reset CSS global
```

---

## API OMDb — Endpoints utilisés

| Endpoint | Paramètre | Retour |
|---|---|---|
| `?s={query}` | Mot-clé | Liste de films (titre, année, poster) |
| `?i={imdbID}&plot=full` | ID IMDb | Fiche complète du film |

---

## Tests

Les tests unitaires couvrent le service OMDb (`src/services/omdb.test.ts`) avec **Vitest**.

```bash
npx vitest run        # Lancer les tests une fois
npx vitest            # Mode watch (relance à chaque modification)
```

### Cas testés

| Fonction | Scénario |
|---|---|
| `searchMovies` | Retourne la liste si l'API répond correctement |
| `searchMovies` | Retourne `[]` si `Response: "False"` (aucun résultat) |
| `searchMovies` | Lance une erreur si la réponse HTTP est KO |
| `searchMovies` | Lance une erreur si `fetch` rejette (pas de connexion) |
| `getMovieById` | Retourne les détails complets du film |
| `getMovieById` | Lance une erreur si la réponse HTTP est KO |

> `fetch` est mocké via `vi.stubGlobal` — aucun appel réseau réel pendant les tests.

---

## Scripts

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run preview  # Prévisualisation du build
npm run lint     # Lint ESLint
```
