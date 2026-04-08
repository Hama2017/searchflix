import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Navbar from './components/Navbar';
import Box from '@mui/material/Box';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Box sx={{ p: 4 }}>
        {/* La suite du TP viendra ici */}
      </Box>
    </ThemeProvider>
  );
}

export default App;
