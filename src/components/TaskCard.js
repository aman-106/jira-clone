import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Task from './Task';

const TaskCard = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
         <Task ref={provided.innerRef} task={task} {...provided.draggableProps} {...provided.dragHandleProps}>
         </Task>
      )}
    </Draggable>
  );
};

export default TaskCard;



