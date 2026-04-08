import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import theme from './theme';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import ResultsSkeleton from './components/ResultsSkeleton';
import NotFound from './components/NotFound';
import type { MovieSearchResult } from './types/Movie';
import Typography from '@mui/material/Typography';
import { handleSearch } from './utils/handlers/handleSearch';

function App() {

  const [results, setResults] = useState<MovieSearchResult[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleSearch('marvel', setResults, setLoading);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Box sx={{ p: 4 }}>
        <SearchBar onSearch={(query) => handleSearch(query, setResults, setLoading)} />
        {!loading && results !== null && results.length > 0 && (
          <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
            {results.length} résultat{results.length > 1 ? 's' : ''}
          </Typography>
        )}
        {loading && <ResultsSkeleton />}
        {!loading && results !== null && results.length === 0 && <NotFound />}
        {!loading && results !== null && results.length > 0 && <ResultsList movies={results} />}
      </Box>
    </ThemeProvider>
  );
}

export default App;
