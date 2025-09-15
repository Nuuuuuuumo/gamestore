import {createTheme, PaletteOptions, ThemeOptions, ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import {ReactNode, useMemo} from "react";
import {useSelector} from "react-redux";

const lightPalette: PaletteOptions = {
  mode: "light" as const,
  primary: {main: "#141414"},
  secondary: {main: "#141414", light: "#141414"},
  background: {default: "#F5F5F5", paper: "#FFFFFF"},
  text: {primary: "#000000", secondary: "#333333"},
};

const darkPalette: PaletteOptions = {
  mode: "dark" as const,
  primary: {main: "#141414"},
  secondary: {main: "#292929", light: "#8a8888"},
  background: {default: "#141414", paper: "#1E1E1E"},
  text: {primary: "#FFFFFF", secondary: "#B3B3B3"},
  action: {
    active: "rgba(255, 255, 255, 0.5)",
    hover: "rgba(255, 255, 255, 0.1)",
    selected: "rgba(255, 255, 255, 0.16)",
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
  },
};

const getThemeTokens = (mode: "light" | "dark"): ThemeOptions => {
  const palette = mode === "dark" ? darkPalette : lightPalette;
  
  return {
    palette,
    typography: {
      fontFamily: "'Manrope', sans-serif",
      button: {textTransform: "none" as const},
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "input:-webkit-autofill": {
            boxShadow: "0 0 0 1000px inset",
            WebkitTextFillColor: mode === "dark" ? "#fff" : "#000",
            WebkitBoxShadow: `0 0 0 1000px ${mode === "dark" ? "#1E1E1E" : "#fff"} inset`,
            transition: "background-color 5000s ease-in-out 0s",
          },
          "input:-webkit-autofill:focus": {
            WebkitTextFillColor: mode === "dark" ? "#fff" : "#000",
            WebkitBoxShadow: `0 0 0 1000px ${mode === "dark" ? "#1E1E1E" : "#fff"} inset`,
          },
          ".css-nrutr0-MuiInputBase-input-MuiOutlinedInput-input:-webkit-autofill": {
            WebkitBoxShadow: `0 0 0 1000px ${mode === "dark" ? "#1E1E1E" : "#fff"} inset`,
            WebkitTextFillColor: mode === "dark" ? "#fff" : "#000",
            transition: "background-color 5000s ease-in-out 0s",
          },
          "input.MuiInputBase-input:-webkit-autofill": {
            WebkitBoxShadow: `0 0 0 1000px ${mode === "dark" ? "#1E1E1E" : "#fff"} inset`,
            WebkitTextFillColor: mode === "dark" ? "#fff" : "#000",
            transition: "background-color 5000s ease-in-out 0s",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: "inherit",
          },
          contained: {
            "&:hover": {
              backgroundColor: mode === "dark" ? "rgba(255, 255, 255, 0.1)" : undefined,
            },
          },
          outlined: {
            "&:hover": {
              backgroundColor: mode === "dark" ? "rgba(255, 255, 255, 0.05)" : undefined,
              borderColor: mode === "dark" ? "rgba(255, 255, 255, 0.3)" : undefined,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderRadius: mode === "dark" ? 0 : undefined, // Remove rounded borders in dark mode
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: mode === "dark" ? 0 : undefined, // Remove rounded borders in dark mode
            "&.Mui-focused": {
              color: palette?.text?.primary,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: mode === "dark" ? "rgba(255, 255, 255, 0.5)" : palette?.text?.primary,
              },
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: mode === "dark" ? "rgba(255, 255, 255, 0.3)" : undefined,
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: palette?.text?.secondary,
            "&.Mui-focused": {
              color: mode === "dark" ? "rgba(255, 255, 255, 0.7)" : palette?.text?.primary,
            },
          },
        },
      },
    },
  };
};

export const ThemeProviderWrapper = ({children}: { children: ReactNode }) => {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = useMemo(() => createTheme(getThemeTokens(mode)), [mode]);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      {children}
    </ThemeProvider>
  );
};