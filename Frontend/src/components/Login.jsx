import React, { useState, useContext } from "react";
import {
  List,
  ListItem,
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ErrorDialog from "../errorHandler/ErrorDialog";
import UserContext from "../provider/authprovider";
import logo from "./logo_final.png";
const useStyles = makeStyles((theme) => ({
  center: {
    margin: "auto",
  },
}));

function Login(props) {
  const classes = useStyles();
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [errorDialog, setErrorDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginMode, setLoginMode] = useState(true);
  async function handleLogIn() {
    setLoading(true);

    var response = await fetch("http://localhost:5000/api/authenticate/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ email: email, password: password }),
    });

    const jsonResponse = await response.json();
    if (response.status !== 200) {
      if (Array.isArray(jsonResponse.message)) {
        setError(jsonResponse.message[0].msg);
      } else {
        setError(jsonResponse.message);
      }
      setErrorDialog(true);
      setLoading(false);
    } else {
      const key = JSON.parse(localStorage.getItem("ud"));
      var expiration = new Date(new Date().getTime() + 1000 * 60 * 60);
      if (key && key.date && new Date(key.date) > new Date()) {
        expiration = new Date(key.date);
      }
      localStorage.setItem(
        "ud",
        JSON.stringify({
          key: jsonResponse.token,
          date: expiration.toISOString(),
        })
      );
      setUser(jsonResponse.token);
      setLoading(false);
    }
  }

  async function handleSignUp() {
    setLoading(true);

    var response = await fetch(
      "http://localhost:5000/api/authenticate/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email: email, password: password }),
      }
    );

    const jsonResponse = await response.json();

    if (response.status !== 200) {
      console.log(jsonResponse);
      if (Array.isArray(jsonResponse.message)) {
        setError(jsonResponse.message[0].msg);
      } else {
        setError(jsonResponse.message);
      }
      setErrorDialog(true);
      setLoading(false);
    } else {
      const key = JSON.parse(localStorage.getItem("ud"));
      var expiration = new Date(new Date().getTime() + 1000 * 60 * 60);
      if (key && key.date && new Date(key.date) > new Date()) {
        expiration = new Date(key.date);
      }
      localStorage.setItem(
        "ud",
        JSON.stringify({
          key: jsonResponse.token,
          date: expiration.toISOString(),
        })
      );
      setUser(jsonResponse.token);
      setLoading(false);
    }
  }

  return (
    <>
    <img src={logo} alt="logo" width="400" height="200" />
      <ErrorDialog
        message={error}
        onClose={setErrorDialog}
        open={errorDialog}
      />
      {loading === false ? (
        <List>
          {loginMode == true ? (
            <ListItem alignItems="center">
              <Typography style = {{color: "red",fontSize:"20px",fontFamily:"monospace"}}>Login</Typography>
            </ListItem>
          ) : (
            <ListItem>
              <Typography style = {{color: "blue", fontFamily: "monospace",fontSize:"20px"}}>Sign Up</Typography>
            </ListItem>
          )}
          <ListItem>
            <TextField
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              label="Email"
              variant="filled"
            />
          </ListItem>
          <ListItem>
            <TextField
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              label="Password"
              variant="filled"
            />
          </ListItem>
          <ListItem>
            
            {/* <Box component="span" m={1} /> */}
           
            {loginMode == false ? (
              <Button
                size="medium"
                onClick={handleSignUp}
                variant="contained"
                color="primary"
              >Signup
              </Button>
            ) : (
              <Button
                size="medium"
                onClick={handleLogIn}
                variant="contained"
                color="Secondary"
              >Login
              </Button>
            )}
            {
              loginMode == true?
              <ListItem button onClick={() => setLoginMode(false)}>
              <Typography style = {{color: "black"}}>Create an account?</Typography>
            </ListItem>: <ListItem button onClick={() => setLoginMode(true)}>
              <Typography style = {{color: "black"}}>Have an account? Login</Typography>
            </ListItem>
            }
            
          </ListItem>
        </List>
      ) : (
        <CircularProgress className={classes.center} />
      )}
    </>
  );
}

export default Login;
