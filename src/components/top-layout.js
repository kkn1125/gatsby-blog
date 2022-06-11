import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import Viewport from "./viewport";
import Layout from "./Layout/Layout";

export default function TopLayout({ children, theme }) {
  return (
    <>
      <Viewport />
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Layout>{children}</Layout>
      </ThemeProvider>
    </>
  );
}

// https://github.com/hupe1980/gatsby-theme-material-ui/tree/master/packages/gatsby-theme-material-ui-top-layout/src/components