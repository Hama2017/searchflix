import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import type { Theme } from '@mui/material/styles';

const SKELETON_COUNT = 8;

function ResultsSkeleton() {
  return (
    <Box sx={styles.grid}>
      {Array(SKELETON_COUNT).fill(null).map((_, i) => (
        <Card key={i} sx={styles.card}>
          <Skeleton variant="rectangular" sx={styles.poster} />
          <CardContent sx={styles.content}>
            <Skeleton variant="text" sx={styles.title} />
            <Skeleton variant="text" sx={styles.year} />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default ResultsSkeleton;

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
  }),
  poster: {
    height: 280,
    transform: 'none',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0.5,
  },
  title: {
    fontSize: '0.95rem',
    width: '80%',
  },
  year: {
    fontSize: '0.75rem',
    width: '40%',
  },
};
