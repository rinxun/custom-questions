import { CSSProperties } from "react";
import colorAlpha from "color-alpha";
import { createTheme, ThemeOptions } from "@mui/material/styles";

function useCustomTheme(props?: {
  primaryColor?: CSSProperties["color"];
  secondaryColor?: CSSProperties["color"];
}) {
  const { primaryColor, secondaryColor } = props || {};

  let themeOptions: ThemeOptions = {
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            whiteSpace: "nowrap",
            fontWeight: 600,
            fontFamily: "Dinpro"
          }
        }
      }
    },
    typography: {
      fontFamily: "Dinpro"
    }
  };

  if (primaryColor) {
    themeOptions = {
      ...themeOptions,
      palette: {
        primary: {
          main: primaryColor,
          light: colorAlpha(primaryColor, 0.08)
        }
      }
    };
  }
  if (secondaryColor) {
    themeOptions = {
      ...themeOptions,
      palette: {
        secondary: {
          main: secondaryColor,
          light: colorAlpha(secondaryColor, 0.08)
        }
      }
    };
  }

  const theme = createTheme(themeOptions);

  return theme;
}

export default useCustomTheme;
