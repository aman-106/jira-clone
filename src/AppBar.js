import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Appbar = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
          Jira Board Clone
        </Typography>
        <Button color="inherit" onClick={() => handleNavigate("/")}>
          Home
        </Button>
        <Button color="inherit" onClick={() => handleNavigate("/board")}>
          Task Board
        </Button>
        <Button color="inherit" aria-label="add task" onClick={() => handleNavigate("/task")}>
          Add Task
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
