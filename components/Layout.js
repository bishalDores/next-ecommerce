import React from "react";
import Head from "next/head";
import useStyles from "../utils/styles";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";

const Layout = ({ children }) => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Quicksand", "sans-serif"].join(","),
    },
  });
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>Next Amazona</title>
      </Head>
      <ThemeProvider theme={theme}>
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <Typography>Amazona</Typography>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>All rights reserved. Next Amazona</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
