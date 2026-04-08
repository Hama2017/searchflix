import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import { useSearch } from '../context/SearchContext';
import type { Movie } from '../types/Movie';
import type { Theme } from '@mui/material/styles';

interface Props {
  imdbID: string | null;
  onClose: () => void;
}

function MovieModal({ imdbID, onClose }: Props) {

  const { getMovie } = useSearch();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!imdbID) return;
    setMovie(null);
    setLoading(true);
    getMovie(imdbID).then((data) => {
      setMovie(data);
      setLoading(false);
    });
  }, [imdbID]);

  return (
    <Modal open={!!imdbID} onClose={onClose} slotProps={{ backdrop: { sx: { backgroundColor: 'rgba(0,0,0,0.85)' } } }}>
      <Box sx={styles.container}>
        <IconButton onClick={onClose} sx={styles.closeButton}>
          <CloseIcon />
        </IconButton>

        {loading && (
          <Box sx={styles.inner}>
            <Skeleton variant="rectangular" sx={styles.posterSkeleton} />
            <Box sx={styles.details}>
              <Skeleton variant="text" width="70%" height={40} />
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="text" width="80%" />
            </Box>
          </Box>
        )}

        {!loading && movie && (
          <Box sx={styles.inner}>
            <Box
              component="img"
              src={movie.Poster !== 'N/A' ? movie.Poster : undefined}
              alt={movie.Title}
              sx={styles.poster}
            />
            <Box sx={styles.details}>
              <Typography variant="h5" sx={styles.title}>{movie.Title}</Typography>
              <Box sx={styles.meta}>
                <Typography variant="caption" sx={styles.metaText}>{movie.Year}</Typography>
                <Typography variant="caption" sx={styles.metaText}>{movie.Runtime}</Typography>
                <Typography variant="caption" sx={styles.metaText}>{movie.Rated}</Typography>
                <Box sx={styles.rating}>
                  <StarIcon sx={styles.star} />
                  <Typography variant="caption">{movie.imdbRating}/10</Typography>
                </Box>
              </Box>
              <Typography variant="caption" sx={styles.genre}>{movie.Genre}</Typography>
              <Typography variant="body2" sx={styles.plot}>{movie.Plot}</Typography>
              <Typography variant="caption" sx={styles.label}>Réalisateur</Typography>
              <Typography variant="body2" sx={styles.value}>{movie.Director}</Typography>
              <Typography variant="caption" sx={styles.label}>Acteurs</Typography>
              <Typography variant="body2" sx={styles.value}>{movie.Actors}</Typography>
              {movie.BoxOffice !== 'N/A' && (
                <>
                  <Typography variant="caption" sx={styles.label}>Box Office</Typography>
                  <Typography variant="body2" sx={styles.value}>{movie.BoxOffice}</Typography>
                </>
              )}
              <Typography variant="caption" sx={styles.awards}>{movie.Awards}</Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
}

export default MovieModal;

const styles = {
  container: (theme: Theme) => ({
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '95vw', md: 800 },
    maxHeight: '90vh',
    overflowY: 'auto',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 3,
    p: 3,
    outline: 'none',
  }),
  closeButton: (theme: Theme) => ({
    position: 'absolute' as const,
    top: 8,
    right: 8,
    color: theme.palette.text.secondary,
  }),
  inner: {
    display: 'flex',
    gap: 3,
    flexDirection: { xs: 'column', sm: 'row' } as const,
  },
  posterSkeleton: {
    width: 200,
    height: 300,
    flexShrink: 0,
    borderRadius: 2,
    transform: 'none',
  },
  poster: {
    width: 200,
    height: 300,
    objectFit: 'cover',
    borderRadius: 2,
    flexShrink: 0,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    flex: 1,
  },
  title: (theme: Theme) => ({
    color: theme.palette.text.primary,
    fontWeight: 700,
    pr: 4,
  }),
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    flexWrap: 'wrap',
  },
  metaText: (theme: Theme) => ({
    color: theme.palette.text.secondary,
  }),
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  },
  star: (theme: Theme) => ({
    color: theme.palette.primary.main,
    fontSize: 16,
  }),
  genre: (theme: Theme) => ({
    color: theme.palette.primary.main,
    fontSize: '0.75rem',
    fontWeight: 600,
  }),
  plot: (theme: Theme) => ({
    color: theme.palette.text.secondary,
    lineHeight: 1.6,
  }),
  label: (theme: Theme) => ({
    color: theme.palette.text.secondary,
    fontSize: '0.7rem',
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
    mt: 1,
  }),
  value: (theme: Theme) => ({
    color: theme.palette.text.primary,
  }),
  awards: (theme: Theme) => ({
    color: theme.palette.primary.main,
    fontSize: '0.75rem',
    mt: 1,
    fontStyle: 'italic',
  }),
};
