// Task.js
import React, { forwardRef, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,

} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import { useTaskContext } from "../TaskManagerProivider";

const useStyles = makeStyles(() => ({
  card: {
    margin: "8px",
  },
}));


const Task = forwardRef(({ task , ...dragProps },ref) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { deleteTask } = useTaskContext();

  const handleEdit = () => {
    navigate(`/task/${task.id}`); // Redirect to edit page
  };

  const handleDeleteTask = () => {
    console.log('called')
    console.debug(deleteTask);
    deleteTask(task.id);
    // navigate(`/task`); // Navigate back to task list if needed
  };

  return (
    <Card className={classes.card} ref={ref} {...dragProps}>
      <CardContent>
        <Typography variant="h4">{task.name}</Typography>
        <Typography variant="body1">{task.description}</Typography>
        <div style={{ display: "flex" }}>
          <Typography variant="body2" color="textSecondary" style={{ marginRight: 8 }}>
            Deadline:
          </Typography>
          <Typography variant="body2">{task.deadline}</Typography>
        </div>
        <div style={{ display: "flex" }}>
          <Typography variant="body2" color="textSecondary" style={{ marginRight: 8 }}>
            Status:
          </Typography>
          <Typography variant="body2">{task.status}</Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" startIcon={<EditIcon />} onClick={handleEdit}>
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteTask}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
  
});

export default Task;
