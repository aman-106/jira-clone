import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { useTaskContext } from "../TaskManagerProivider";

const STATUSES = ['todo', 'inprogress', 'blocked', 'done'];

const TaskBoard = () => {
  const { tasks, updateTask } = useTaskContext();

  const [board, setBoard] = useState({
    todo: [],
    inprogress: [],
    blocked: [],
    done: []
  });

  useEffect(() => {
    const groupTasks = tasks.reduce((acc, task) => {
      acc[task.status].push(task);
      return acc;
    }, { todo: [], inprogress: [], blocked: [], done: [] });

    setBoard(groupTasks);
  }, [tasks]);

  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = board[newStatus].map(task => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });

    setBoard(prevBoard => ({
      ...prevBoard,
      [newStatus]: updatedTasks
    }));

    // Update task status in your backend/state management solution here
    updateTask(taskId, { status: newStatus });
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    // If the task was dropped outside of the droppable area, return early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Move the task to the new status
    const updatedTasks = [...board[source.droppableId]];
    const [removed] = updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, removed);

    setBoard((prevBoard) => ({
      ...prevBoard,
      [source.droppableId]: updatedTasks
    }));

    // Update task status in your backend/state management solution here
    updateTaskStatus(draggableId, destination.droppableId);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container spacing={2}>
        {STATUSES.map((status) => (
          <Grid item xs={3} key={status}>
            <Paper style={{ padding: 16 }}>
              <Typography variant="h6">{status}</Typography>
              <Droppable droppableId={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {board[status].map((task, index) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        index={index}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </DragDropContext>
  );
};



export default TaskBoard;
