import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import type { MovieSearchResult } from '../types/Movie';
import type { Theme } from '@mui/material/styles';
import MovieModal from './MovieModal';

interface Props {
  movies: MovieSearchResult[];
}

interface MovieCardProps {
  movie: MovieSearchResult;
  onDetails: (imdbID: string) => void;
}

function MovieCard({ movie, onDetails }: MovieCardProps) {

  const [imgError, setImgError] = useState(false);
  const showFallback = !movie.Poster || movie.Poster === 'N/A' || imgError;

  return (
    <Card sx={styles.card}>
      {showFallback ? (
        <Box sx={styles.posterFallback}>
          <BrokenImageIcon sx={styles.posterFallbackIcon} />
          <Typography sx={styles.posterFallbackText}>Pas d'image</Typography>
        </Box>
      ) : (
        <CardMedia
          component="img"
          image={movie.Poster}
          alt={movie.Title}
          sx={styles.poster}
          onError={() => setImgError(true)}
        />
      )}
      <CardContent sx={styles.content}>
        <Typography variant="h6" sx={styles.title}>{movie.Title}</Typography>
        <Typography variant="caption" sx={styles.year}>{movie.Year}</Typography>
      </CardContent>
      <CardActions sx={styles.actions}>
        <Button size="small" sx={styles.detailsButton} onClick={() => onDetails(movie.imdbID)}>
          En savoir plus
        </Button>
      </CardActions>
    </Card>
  );
}

function ResultsList({ movies }: Props) {

  const [selectedID, setSelectedID] = useState<string | null>(null);

  if (movies.length === 0) return null;

  return (
    <>
      <Box sx={styles.grid}>
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} onDetails={setSelectedID} />
        ))}
      </Box>
      <MovieModal imdbID={selectedID} onClose={() => setSelectedID(null)} />
    </>
  );
}

export default ResultsList;

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 3,
    mt: 4,
  },
  card: (theme: Theme) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: 2,
    overflow: 'hidden',
    transition: 'transform 0.2s',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': { transform: 'scale(1.03)' },
  }),
  poster: {
    height: 280,
    objectFit: 'cover',
  },
  posterFallback: (theme: Theme) => ({
    height: 280,
    backgroundColor: theme.palette.background.paper,
    backgroundImage: `repeating-linear-gradient(
      45deg,
      ${theme.palette.background.default} 0px,
      ${theme.palette.background.default} 10px,
      ${theme.palette.background.paper} 10px,
      ${theme.palette.background.paper} 20px
    )`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  }),
  posterFallbackIcon: (theme: Theme) => ({
    fontSize: 64,
    color: theme.palette.text.secondary,
    opacity: 0.3,
  }),
  posterFallbackText: (theme: Theme) => ({
    color: theme.palette.text.secondary,
    fontSize: '0.75rem',
    opacity: 0.5,
  }),
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0.5,
    flex: 1,
  },
  actions: {
    px: 2,
    pb: 1,
  },
  title: (theme: Theme) => ({
    color: theme.palette.text.primary,
    fontWeight: 700,
    fontSize: '0.95rem',
    lineHeight: 1.3,
  }),
  year: (theme: Theme) => ({
    color: theme.palette.text.secondary,
  }),
  detailsButton: (theme: Theme) => ({
    color: theme.palette.text.primary,
    fontSize: '0.75rem',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '999px',
    px: 2,
    py: 0.5,
    width: '100%',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      color: theme.palette.text.primary,
    },
  }),
};
