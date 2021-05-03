import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import jwt_decode from "jwt-decode";
import UserContext from "../provider/authprovider";
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  AccountCircle,
  MapRounded,
  ErrorRounded,
  CodeRounded,
  Menu,
  NewReleasesRounded,
  ReportProblemRounded,
  BookRounded,
  Chat,
  NoteRounded,
  AddBox
} from "@material-ui/icons";
import MainPageContent from "./MainPageContent";
import { useHistory } from 'react-router-dom';
import ListIcon from '@material-ui/icons/List';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: '#333333',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState(jwt_decode(user)["email"]);
  const history = useHistory();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  var username = email;
  username = username.substring(0,username.indexOf("@"));
  const firstLevelIcons = [
    <AccountCircle />,
    <MapRounded />,
    <ErrorRounded />,
    <CodeRounded />,
  ];
  const secondLevelIcons = [
    <NewReleasesRounded />,
    <ReportProblemRounded />,
    <BookRounded />,
  ];

  function goToChat(){
    history.push("/joinchat")
  }
  function addProject(){
    history.push("/makeproject")
  }

  function goToProgress(){
    history.push("/progress")
  }

  function goToMeetings(){
    history.push("/meetings")
  }

  let drawerCol = {
    color: "white",
    fontSize: 10,
    }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List style = {drawerCol}>
        {["Profile: " + username, "Roadmap", "Issues", "Code"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon style = {drawerCol}>{firstLevelIcons[index]}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <ListItem button onClick={goToChat}> 
            <ListItemIcon style = {drawerCol}>{<Chat/>}</ListItemIcon>
            <ListItemText primary={"Chat"} />
        </ListItem>
        <ListItem button onClick={addProject}> 
            <ListItemIcon style = {drawerCol}>{<AddBox/>}</ListItemIcon>
            <ListItemText primary={"Make project"} />
        </ListItem>
        <ListItem button onClick={goToProgress}> 
            <ListItemIcon style = {drawerCol}>{<ListIcon/>}</ListItemIcon>
            <ListItemText primary={"Progress"} />
        </ListItem>
        <ListItem button onClick={goToMeetings}> 
            <ListItemIcon style = {drawerCol}>{<NoteRounded/>}</ListItemIcon>
            <ListItemText primary={"Meetings"} />
        </ListItem>
      </List>
      <Divider />
      <List style = {drawerCol}>
        {["Releases", "Reports", "Scrum"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon style = {drawerCol}>{secondLevelIcons[index]}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} style = {{ background: '#333333'}} >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap style = {{fontSize:"20px",fontFamily: "Monospace",borderStyle:"solid", paddingLeft:"10px",paddingRight:"10px"}}>
            Tracking Bits
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <MainPageContent />
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
