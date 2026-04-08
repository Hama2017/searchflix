import { useState } from 'react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import type { Theme } from '@mui/material/styles';
import { handleSearchSubmit } from './utils/handlers/handleSearchSubmit';

interface Props {
  onSearch: (query: string) => void;
}
function SearchBar({ onSearch }: Props) {

  const [query, setQuery] = useState('');

  return (
    <Box component="form" onSubmit={(e) => handleSearchSubmit(e, query, onSearch)} sx={styles.wrapper} role="search">
      <InputBase
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un film..."
        fullWidth
        inputProps={{ 'aria-label': 'Rechercher un film' }}
        sx={styles.input}
      />
      <IconButton
        type="submit"
        disabled={!query.trim()}
        aria-label="Lancer la recherche"
        sx={styles.button}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
}

export default SearchBar;

const styles = {
  wrapper: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    maxWidth: 600,
    mx: 'auto',
    mt: 6,
    px: 2,
    py: 0.5,
    borderRadius: '999px',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    transition: 'border-color 0.2s',
    '&:focus-within': {
      borderColor: theme.palette.primary.main,
    },
  }),
  input: (theme: Theme) => ({
    color: theme.palette.text.primary,
    fontSize: '1rem',
    px: 1,
  }),
  button: (theme: Theme) => ({
    color: theme.palette.primary.main,
    '&:hover': { backgroundColor: 'transparent', opacity: 0.8 },
    '&.Mui-disabled': { opacity: 0.3 },
  }),
};
