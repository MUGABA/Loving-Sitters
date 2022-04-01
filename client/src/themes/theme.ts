import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#f14140',
      dark: 'rgba(0, 0, 0, 0.1)',
      light: 'rgba(255,255,255,1)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Open Sans", "sans-serif"',
    fontSize: 12,
    h2: {
      fontWeight: 800,
    },
    h3: {
      fontWeight: 800,
    },
    button: {
      fontWeight: 700,
    },
  },
});
