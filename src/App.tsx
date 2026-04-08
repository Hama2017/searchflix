import { useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import theme from './theme';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import ResultsSkeleton from './components/ResultsSkeleton';
import NotFound from './components/NotFound';
import { SearchProvider, useSearch } from './context/SearchContext';

function AppContent() {

  const { results, loading, error, search } = useSearch();

  useEffect(() => {
    search('marvel');
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <SearchBar onSearch={search} />
      {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}
      {!loading && results !== null && results.length > 0 && (
        <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
          {results.length} résultat{results.length > 1 ? 's' : ''}
        </Typography>
      )}
      {loading && <ResultsSkeleton />}
      {!loading && results !== null && results.length === 0 && <NotFound />}
      {!loading && results !== null && results.length > 0 && <ResultsList movies={results} />}
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SearchProvider>
        <Navbar />
        <AppContent />
      </SearchProvider>
    </ThemeProvider>
  );
}

export default App;
