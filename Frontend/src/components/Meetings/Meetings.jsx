import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
  ListItem,
  makeStyles,
  Box,
  Button,
  TextField,
  List,
  IconButton,
  Icon,
} from "@material-ui/core";
import FloatingActionButton from "./Fab";
import FabDialog from "./FabDialog";
import { Add, Delete, EditRounded , DeleteForeverRounded} from "@material-ui/icons";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
const useStyles = makeStyles((theme) => ({
  center: {
    margin: 0,

    position: "absolute",
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  verticleCenter: {
    margin: "auto",
    width: "40%",
  },
  
}));
function Meetings(props) {
  const classes = useStyles();
  const [meetings, setMeetings] = useState([
    {
      date: "19-03-2021",
      time: "04:30",
      agenda: ["Do something one", "Do something two", "Do something three"],
    },
    {
      date: "19-03-2021",
      time: "04:30",
      agenda: ["Do something one", "Do something two", "Do something three"],
    },
    {
      date: "19-03-2021",
      time: "04:30",
      agenda: ["Do something one", "Do something two", "Do something three"],
    },
  ]);
  const [pastMeetings, setPastMeeting] = useState([
    {
      date: "19-03-2021",
      time: "04:30",
      agenda: [
        "Past Do something one",
        "Do something two",
        "Do something three",
      ],
    },
    {
      date: "19-03-2021",
      time: "04:30",
      agenda: [
        "Past Do something one",
        "Do something two",
        "Do something three",
      ],
    },
    {
      date: "19-03-2021",
      time: "04:30",
      agenda: [
        "Past Do something one",
        "Do something two",
        "Do something three",
      ],
    },
  ]);
  const [cards, setCards] = useState(meetings);
  const [button, setButton] = useState("upcoming");
  const [agenda, setAgenda] = useState([]);
  const [dialog, setDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date()
  );
  function switchToPastMeeting() {
    setButton("past");
    setCards(pastMeetings);
  }
  function switchToUpcomingMeeting() {
    setButton("upcoming");
    setCards(meetings);
  }
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <>
      {button === "upcoming" ? (
        <Button
      
          variant="contained"
          color="primary"
          onClick={switchToPastMeeting}
        >
          Show past meetings
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={switchToUpcomingMeeting}
        >
          Show upcoming meetings
        </Button>
      )}
      {cards.map((element) => {
        return (
          <>
            <Card className={classes.verticleCenter}>
              <CardHeader
                title={"Date: " + element.date + " " + "Time: " + element.time}
              />
              <CardContent>
                {element.agenda.map((agenda) => {
                  return <Typography>{agenda}</Typography>;
                })}
              </CardContent>
                  <ListItem alignItems="center">
                  <IconButton>
                      <DeleteForeverRounded/>
                  </IconButton>
                      <Box width={50}/>
                  <IconButton>
                      <EditRounded/>
                  </IconButton>
                  </ListItem>

            </Card>
            <Box height={50} />
          </>
        );
      })}
      <FabDialog
        onClose={() => {
          setAgenda([]);
        }}
        closeDialog={setDialog}
        open={dialog}
        onButtonClick={async () => {}}
        buttonText="Add meeting"
        noButton={false}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDateTimePicker
            variant="inline"
            margin="normal"
            id="date-picker-inline"
            label="Date"
            value={selectedDate}
            onChange={date => handleDateChange(date)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        <ListItem>
          <TextField
            label="Meeting Agenda"
            value={agenda}
            onChange={(event) => {
              setAgenda(event.target.value);
            }}
            variant="filled"
            multiline
            rows={4}
            margin="normal"
            fullWidth
          />
        </ListItem>
      </FabDialog>
      <FloatingActionButton onClick={setDialog.bind(this, true)}>
        <Add />
      </FloatingActionButton>
    </>
  );
}

export default Meetings;
