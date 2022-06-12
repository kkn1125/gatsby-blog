import React, { createContext, useMemo, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { responsiveFontSizes } from '@mui/material/styles';

import Viewport from "./viewport";
import Layout from "./layout/Layout";
import lightTheme from "../lightTheme";
import darkTheme from "../darkTheme";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function TopLayout({ children }) {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === "light" ? lightTheme : darkTheme),
    },
  });

  const theme = useMemo(() =>
    responsiveFontSizes(createTheme(getDesignTokens(mode)), [mode])
  );

  return (
    <>
      <Viewport />
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Layout>{children}</Layout>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

// https://github.com/hupe1980/gatsby-theme-material-ui/tree/master/packages/gatsby-theme-material-ui-top-layout/src/components
