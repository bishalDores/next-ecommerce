import { List, ListItem, Typography, TextField } from "@material-ui/core";
import React from "react";
import Layout from "../components/Layout";

const Login = () => {
  return (
    <Layout title="Login">
      <form>
        <Typography variant="h1" component="h1">
          Login
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: "email" }}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: "password" }}
            ></TextField>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default Login;
