import React, { useReducer, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Snackbar,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import { useTaskContext } from "../TaskManagerProivider";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  name: "",
  description: "",
  deadline: "",
  status: "todo",
};

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "RESET":
      return initialState;
    case "UPDATE":
      return {
        ...state,
        ...action.payload, // Update state with fetched task data
      };
    default:
      return state;
  }
}

const useStyles = makeStyles(() => ({
  formControl: {
    margin: "8px",
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: "16px",
  },
  actionBtn: {
    marginTop: "8px !important",
  },
  taskForm: {
    padding: "16px",
  },
}));

function TaskForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();
  const { id } = useParams();
  const { getTask, saveNewTask, updateTask } = useTaskContext();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch task for editing
      const task = getTask(id);
      dispatch({ type: "UPDATE", payload: task });
    }
  }, [id, dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({
      type: "CHANGE",
      field: name,
      value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
      updateTask(id, state);
      setNotification("Task updated successfully.");
    } else {
      saveNewTask(state);
      dispatch({ type: "RESET" });
      setNotification("Task added successfully.");
    }
  };

  const handleSnackbarClose = () => {
    setNotification(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.taskForm}>
        <Typography variant="h6">{id ? "Update Task" : "Add Task"}</Typography>
        <TextField
          label="Name"
          name="name"
          value={state.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={state.description}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          multiline
          rows={4}
          margin="normal"
        />
        <TextField
          label="Deadline"
          name="deadline"
          type="date"
          value={state.deadline}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            name="status"
            value={state.status}
            onChange={handleChange}
            label="Status"
            required
          >
            <MenuItem value="todo">To Do</MenuItem>
            <MenuItem value="inprogress">In Progress</MenuItem>
            <MenuItem value="blocked">Blocked</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" className={classes.actionBtn}>
          {id ? "Update Task" : "Add Task"}
        </Button>
      </form>
      <Snackbar
        open={!!notification}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={notification}
        anchorOrigin={{vertical:"top",horizontal:'right'}}
      />
    </>
  );
}

export default TaskForm;
