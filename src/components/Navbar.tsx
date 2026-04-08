import type { Theme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconMarquee from './IconMarquee';
import useTypewriter from '../hooks/useTypewriter';

const LOGO_ANIMATED_PART_TEXT = 'Search';

function Navbar() {

  const { displayed, waiting } = useTypewriter(LOGO_ANIMATED_PART_TEXT);

  return (
    <AppBar component="nav" aria-label="Navigation principale" position="static" sx={styles.appBar}>
      <Toolbar disableGutters sx={styles.toolbar}>
        <Box component="img" src="/images/picto.svg" alt="" aria-hidden="true" sx={styles.logo} />
        <Typography variant="h6" aria-label="SearchFlix" sx={styles.title}>
          <Box component="span" aria-hidden="true" sx={styles.search}>
            {displayed}
            {!waiting && <Box component="span" sx={styles.cursor}>|</Box>}
          </Box>
          <Box component="span" aria-hidden="true" sx={styles.flix}>Flix</Box>
        </Typography>
        <IconMarquee aria-hidden="true" />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

const styles = {
  appBar: (theme: Theme) => ({
    backgroundColor: theme.palette.background.default,
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
  }),
  toolbar: {
    gap: 2,
    pl: 2,
    pr: 0,
  },
  logo: {
    height: 40,
    mr: '-5px',
  },
  title: {
    fontWeight: 700,
    letterSpacing: 1,
    whiteSpace: 'nowrap',
  },
  search: (theme: Theme) => ({
    color: theme.palette.text.primary,
    display: 'inline-block',
  }),
  cursor: (theme: Theme) => ({
    color: theme.palette.primary.main,
    animation: 'blink 1s step-end infinite',
    '@keyframes blink': {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0 },
    },
  }),
  flix: (theme: Theme) => ({
    color: theme.palette.primary.main,
  }),
};
