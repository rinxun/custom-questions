import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          whiteSpace: 'nowrap',
          fontWeight: 600,
          fontFamily: 'Dinpro'
        }
      }
    }
  },
  typography: {
    fontFamily: 'Dinpro'
  }
});

const withTheme = (Component: React.ElementType) => {
  const CustomComponent = (props: any) => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...props} />
    </ThemeProvider>
  );

  return CustomComponent;
};

export default withTheme;
