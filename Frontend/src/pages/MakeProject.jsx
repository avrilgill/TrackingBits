import React, { useState, useContext } from "react";
import jwt_decode from "jwt-decode";
import UserContext from "../provider/authprovider";
import { useHistory } from "react-router-dom";
import ErrorDialog from "../errorHandler/ErrorDialog";
import {
  makeStyles,
  Snackbar,
  Box,
  Typography,
  List,
  ListItem,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";

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

function MakeProject(props) {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState(jwt_decode(user)["email"]);
  const [projName, setProjName] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [projPass, setProjPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorDialog,setErrorDialog] = useState(false);
  const [error,setError] = useState("")
  const history = useHistory();
 
  async function addProject() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/project/addProject`,
        {
          method: "POST",
          body: JSON.stringify({
            name: projName,
            desc: projDesc,
            password: projPass,
          }),
          headers: {
            authorization: "Bearer " + user.toString(),
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        throw Error(response.message);
      } 
    } catch (error) {
      setError(error.message);
      setErrorDialog(true);
    }
  }
  return (
    <>
       <ErrorDialog open={errorDialog} onClose={setErrorDialog}
                message={error}></ErrorDialog>
      <List className={classes.center}>
        <ListItem>
          <Typography>✤ Add your project details ✤</Typography>
        </ListItem>
        <ListItem>
          <TextField
            value={projName}
            onChange={(event) => {
              setProjName(event.target.value);
            }}
            label="Project name"
            variant="filled"
          />
        </ListItem>
        <ListItem>
          <TextField
            value={projDesc}
            onChange={(event) => {
              setProjDesc(event.target.value);
            }}
            label="Description (optional)"
            variant="filled"
          />
        </ListItem>
        <ListItem>
          <TextField
            value={projPass}
            onChange={(event) => {
              setProjPass(event.target.value);
            }}
            label="Password"
            variant="filled"
          />
        </ListItem>
        <Box component="span" m={5} />
        {loading === false ? (
          <Button
            size="medium"
            onClick={addProject}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        ) : (
          <CircularProgress size={"3rem"} />
        )}
      </List>
    </>
  );
}

export default MakeProject;
