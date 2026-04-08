import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';

const COUNTDOWN_START = 30;

function NotFound() {

  const [seconds, setSeconds] = useState(COUNTDOWN_START);
  const TIMEOUT = seconds === 0;

  useEffect(() => {
    setSeconds(COUNTDOWN_START);
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={styles.wrapper}>
      <Box component="img" src={TIMEOUT ? "/images/animated.gif" : "/images/404.png"} alt="Tung Tung Tung Sahur" sx={styles.image} />
      <Typography variant="h5" sx={styles.title}>
        Tu vas réessayer avec un autre mot-clé...
      </Typography>
      <Typography variant="body1" sx={styles.subtitle}>
        Le Tung Tung Tung Sahur est déjà en route chez toi. T'as{' '}
        <Box component="span" sx={seconds <= 10 ? styles.countdownDanger : styles.countdown}>
          {seconds}s
        </Box>{' '}
        pour trouver un autre mot-clé.
      </Typography>
    </Box>
  );
}

export default NotFound;

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    mt: 6,
    gap: 2,
  },
  image: {
    width: 220,
    opacity: 0.9,
  },
  title: (theme: Theme) => ({
    color: theme.palette.primary.main,
    fontWeight: 700,
    letterSpacing: 2,
  }),
  subtitle: (theme: Theme) => ({
    color: theme.palette.text.secondary,
    textAlign: 'center',
    maxWidth: 400,
  }),
  countdown: (theme: Theme) => ({
    color: theme.palette.primary.main,
    fontWeight: 700,
  }),
  countdownDanger: (theme: Theme) => ({
    color: theme.palette.primary.main,
    fontWeight: 700,
    animation: 'pulse 0.5s ease-in-out infinite',
    '@keyframes pulse': {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.3 },
    },
  }),
};
