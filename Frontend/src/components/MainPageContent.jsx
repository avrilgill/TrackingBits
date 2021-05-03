import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
function MainPageContent(props) {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Typography paragraph style = {{textAlign:"justify", borderStyle:"solid", fontFamily: "monospace", paddingLeft:"10px",paddingRight:"10px", paddingTop:"10px", paddingBottom: "10px", marginTop:"125px"}}>
        TrackingBits is a web application which provides a platform to help
        small to medium sized teams manage projects in an organized way. Project
        lead and Team members have to sign up for a TrackingBits account. After
        creating an account, project leads can create a private project space
        and allow team members to access it by adding them to the project space.
        Project lead can assign different work to team members and manage
        overall project through features such as task management with kanban
        board, overview of scheduled work with gantt chart like roadmap, meeting
        reminders with user created notes, activity feed with flashcard style
        notes, centralized progress tracking page, team based chat rooms and
        file sharing. After assigning different tasks, each with start and end
        date to team members, everyone can take advantage of roadmaps, reminders
        and boards to track and update the status of their respective task.
        Through these features project leads can monitor performance of
        individual team members and detect team burndown periods to plan future
        individual workload accordingly. Finally TrackingBits allows guest
        users, for example a client, to access project roadmap which helps
        project leads better showcase the overall progress.
      </Typography>
      <Typography paragraph style = {{textAlign:"justify",borderStyle:"solid", fontFamily: "monospace", paddingTop:"10px", paddingBottom: "10px",paddingLeft:"10px",paddingRight:"10px"}}>
        TrackingBits manages see(read), change(write) and delete access to its
        different features through four account types, Admin, Project Lead,
        Teammate and Outsider. Admin has see, change and delete access to
        everything in a TrackingBits project space for example, an Admin type
        user can see, change and delete any epics, can change factors related to
        previous and current sprints, can give or restrict user access to
        certain or all TrackingBits feature/s, remove user from project space
        etc. Project Leads have somewhat similar access rights like Admins, but
        Project Leads can only change and delete settings of epics and tasks
        which are not assigned to a user yet. Project leads can not delete
        project space unless it is allowed by the Admin user. Project leads
        cannot change information about sprints that have concluded. Each
        teammate can only change data related to epics which are assigned to
        them. Teammates can for example transfer an epic to another teammate,
        update assigned epic or story’s progress status, change Kanban board
        data related to assigned epics and so on. Outsiders can only see the
        project roadmap which helps Project Leads better showcase the overall
        project plan and progress made so far.
      </Typography>
    </main>
  );
}

export default MainPageContent;
