import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./TaskManagerProivider";
import Appbar from "./AppBar";
import TaskList from './components/TaskList';

const TaskBoard = React.lazy(()=> import("./components/TaskBoard"));
const TaskForm = React.lazy(()=> import("./components/TaskForm"));


function App() {
  return (
    <TaskProvider>
      <Router>
        <Appbar />
        <Routes>
          <Route exact path="/" element={<TaskList />} />
          <Route
            exact
            path="/board"
            element={
              <React.Suspense fallback={<div>Loading Task Board...</div>}>
                <TaskBoard />
              </React.Suspense>
            }
          />
          <Route
            path="/task/:id?"
            element={
              <React.Suspense fallback={<div>Loading Task Form...</div>}>
                <TaskForm />
              </React.Suspense>
            }
          />
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default App;
