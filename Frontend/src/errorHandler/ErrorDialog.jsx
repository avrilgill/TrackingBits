import React, { useState } from "react";
import { Dialog, List, ListItem, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {});

function ErrorDialog(props) {
  const classes = useStyles();

  return (
    <>
      <Dialog open={props.open} onClose={props.onClose}>
        <List>
          <ListItem>{props.message}</ListItem>
          <ListItem>
            <Button onClick={props.onClose.bind(this, false)}>Cancel</Button>
          </ListItem>
        </List>
      </Dialog>
    </>
  );
}

export default ErrorDialog;
