import React, { useState, useContext, useEffect } from "react";
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

function ALlProjects(props){
    const classes = useStyles();
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState(jwt_decode(user)["email"]);
  const [projName, setProjName] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [projPass, setProjPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorDialog,setErrorDialog] = useState(false);
  const [error,setError] = useState("")
  const [projects, setProjects] = useState([])
  const history = useHistory();

  useEffect(()=>{
    try {
        const response = await fetch(
          `http://localhost:5000/api/project/allProjects`,
          {
            method: "GET",
          
            headers: {
              authorization: "Bearer " + user.toString(),
              "Content-Type": "application/json",
            },
          }
        );
        const jsonResponse = await response.json();
        if (response.status !== 200) {
            setProjects(jsonResponse.projects);
          throw Error(response.message);
        } 
      } catch (error) {
        setError(error.message);
        setErrorDialog(true);
      }
  },[])
}