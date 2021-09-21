import React from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "../utils/styles";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  createTheme,
  ThemeProvider,
  Link,
  CssBaseline,
  Switch,
  Badge,
} from "@material-ui/core";
import NextLink from "next/link";
import { changeThemeMode } from "../redux/actions/themeAction";

const Layout = ({ title, children, description }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.theme);
  const { cart } = useSelector((state) => state.cartItems);

  const theme = createTheme({
    typography: {
      fontFamily: ["Quicksand", "sans-serif"].join(","),
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });

  const changeModeHandler = (e) => {
    dispatch(changeThemeMode(e.target.checked));
  };

  return (
    <div>
      <Head>
        <title>{title ? `${title} - Next Amazona` : "Next Amazona"}</title>
        {description && <meta name="description" content={description}></meta>}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossorigin="anonymous"
        ></link>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>Amazona</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <Switch checked={darkMode} onChange={changeModeHandler}></Switch>
              <NextLink href="/login" passHref>
                <Link>Login</Link>
              </NextLink>
              <NextLink href="/cart" passHref>
                <Link>
                  {cart.length > 0 ? (
                    <Badge color="secondary" badgeContent={cart.length}>
                      Cart
                    </Badge>
                  ) : (
                    "Cart"
                  )}
                </Link>
              </NextLink>
            </div>
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
