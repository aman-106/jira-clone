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
        // <Card
        //   ref={provided.innerRef}
        //   {...provided.draggableProps}
        //   {...provided.dragHandleProps}
        // >
        //   <CardContent>
        //     <Typography variant="h4">{task.name}</Typography>
        //     <Typography variant="body1">{task.description}</Typography>
        //     <div style={{ display: "flex" }}>
        //       <Typography variant="body2" color="textSecondary" style={{ marginRight: 8 }}>
        //         Deadline:
        //       </Typography>
        //       <Typography variant="body2">{task.deadline}</Typography>
        //     </div>
        //     <div style={{ display: "flex" }}>
        //       <Typography variant="body2" color="textSecondary" style={{ marginRight: 8 }}>
        //         Status:
        //       </Typography>
        //       <Typography variant="body2">{task.status}</Typography>
        //     </div>
        //     <div style={{ display: "flex", justifyContent: "flex-end" }}>
        //       <Button variant="contained" startIcon={<EditIcon />}>
        //         Edit
        //       </Button>
        //       <Button
        //         variant="contained"
        //         color="error"
        //         startIcon={<DeleteIcon />}
        //       >
        //         Delete
        //       </Button>
        //     </div>
        //   </CardContent>
        // </Card>
         <Task ref={provided.innerRef} task={task} {...provided.draggableProps} {...provided.dragHandleProps}>
         </Task>
      )}
    </Draggable>
  );
};

export default TaskCard;



