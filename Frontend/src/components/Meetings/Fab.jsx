import React from "react";
import { makeStyles, Fab } from "@material-ui/core"
const useStyles = makeStyles((theme) => ({
    margin: {

        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    marginTwo:{
        position:"fixed",
        bottom: theme.spacing(10),
        right: theme.spacing(2),
    }
}));
function FloatingActionButton(props) {
    const classes = useStyles();
    return (

        <Fab onClick={props.onClick} size="large" color="secondary" aria-label="add" className={
            props.more===true?
            classes.marginTwo:
            classes.margin
        }>
            {props.children}
        </Fab>
    )

}
export default FloatingActionButton;