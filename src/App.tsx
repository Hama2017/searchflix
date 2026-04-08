import { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import theme from './theme';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import NotFound from './components/NotFound';
import type { MovieSearchResult } from './types/Movie';
import { handleSearch } from './utils/handlers/handleSearch';

function App() {

  const [results, setResults] = useState<MovieSearchResult[] | null>(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Box sx={{ p: 4 }}>
        <SearchBar onSearch={(query) => { handleSearch(query, setResults); }} />
        {results !== null && results.length === 0 && <NotFound />}
        {results !== null && results.length > 0 && <ResultsList movies={results} />}
      </Box>
    </ThemeProvider>
  );
}

export default App;
