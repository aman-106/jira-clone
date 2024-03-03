import React, { useState, useEffect, useContext } from "react";
import { Paper, Typography, Button, TextField } from '@mui/material';
import Task from './Task';
import { useTaskContext } from "../TaskManagerProivider";


const TaskList = () => {
  const {tasks,updateTask,deleteTask} = useTaskContext();
  return (
    <div>
      <Typography variant="h3">Task List</Typography>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          editTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
      {
        tasks && tasks.length ===0 && <Typography variant="body1">No tasks available</Typography>
      }
    </div>
  );
};

export default TaskList;
