import { FC, ComponentClass, ElementType } from 'react';
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

type ComponentProps<TComponent> = TComponent extends FC<infer Props>
  ? Props
  : TComponent extends ComponentClass<infer Props>
  ? Props
  : never;

const withTheme = (Component: ElementType) => {
  const CustomComponent = (props: ComponentProps<typeof Component>) => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...props} />
    </ThemeProvider>
  );

  return CustomComponent;
};

export default withTheme;
