import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Login from "../components/Login";
import UserContext from "../provider/authprovider";
import FeedPage from "./MainPage";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles, Snackbar, Box } from "@material-ui/core";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

let logoutTimer;

const useStyles = makeStyles((theme) => ({
  center: {
    margin: 0,

    position: "absolute",
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}));

function AuthPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const [snackbar, setSnackbar] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [expirationToken, setExpirationToken] = useState();
  useEffect(() => {
    const key = JSON.parse(localStorage.getItem("ud"));
    var expiration = new Date(new Date().getTime() + 1000 * 60 * 60);

    if (key && key.date && new Date(key.date) > new Date()) {
      setUser(key.key);
      expiration = new Date(key.date);
    }
    setExpirationToken(expiration);
  }, [setUser]);
  useEffect(() => {
    if (user && expirationToken) {
      const remainingTime = expirationToken.getTime() - new Date().getTime();
      logoutTimer = setTimeout(() => {
        setUser(undefined);
        localStorage.removeItem("ud");
        history.replace("/", {
          action: "logout",
          message: "Please login again",
        });
        console.log("Hello timer out");
      }, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [user, expirationToken, setUser]);

  useEffect(() => {
    console.log();
    if (props.location.state && props.location.state.action === "logout") {
      setSnackbar(true);
    }
  }, []);
  return (
    <>
      {typeof user === "undefined" ? (
        <Box className={classes.center} m="auto">
          <Login />
        </Box>
      ) : (
        <FeedPage></FeedPage>
      )}
      {props.location.state && (
        <Snackbar
          open={snackbar}
          onClose={() => {
            setSnackbar(false);
          }}
        >
          {props.location.state ? (
            <Alert
              onClose={() => {
                setSnackbar(false);
              }}
              severity="error"
            >
              {props.location.state.message}
            </Alert>
          ) : null}
        </Snackbar>
      )}
    </>
  );
}

export default AuthPage;
