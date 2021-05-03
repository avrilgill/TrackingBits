import React,{useState} from "react";
import { Dialog, List, ListItem, Button,CircularProgress, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme)=>({
    center: {
        margin: "auto"
    },
    centerTransform: {
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    },
}))

function FabDialog(props) {
    const classes = useStyles()
    const [loading,setLoading] = useState(false)

    async function onCLickHandler(){
        setLoading(true);
        await props.onButtonClick().then(()=>{
            setLoading(false);
            props.closeDialog();
        });
        console.log("Loading")
        
        
    }
   
    return (
        <Dialog onClose={props.onClose} open={props.open}>
            <List >
                    {props.children}
                <ListItem>
                    {   
                        props.noButton===false?
                        loading===false?
                        <Button className={classes.center} onClick={onCLickHandler} variant="contained" color="primary">
                        {props.buttonText}
                        </Button>:<CircularProgress />:null
                    }
                </ListItem>
            </List>
        </Dialog>
    );
}

export default FabDialog;