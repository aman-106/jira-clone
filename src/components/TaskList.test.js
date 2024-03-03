import React from "react";
import { render, screen } from "@testing-library/react";
import TaskList from "./TaskList"; // Replace with the path to your TaskList.js
import { TaskContext } from "../TaskManagerProivider"; // Import the actual provider
import { BrowserRouter} from "react-router-dom";


describe("TaskList component", () => {
  it("renders 'Task List' heading", () => {
    const emptyList = {
        tasks: [],
        saveNewTask: () => {},
        updateTask: () => {},
        deleteTask: () => {},
        getTask:()=>[]
    }
    render(
      <TaskContext.Provider value={emptyList}>
        <TaskList />
      </TaskContext.Provider>

    );

    expect(screen.getByText("Task List")).toBeInTheDocument();
  });

  it("renders no tasks message when tasks array is empty", () => {
    const emptyList = {
        tasks: [],
        saveNewTask: () => {},
        updateTask: () => {},
        deleteTask: () => {},
        getTask:()=>[]
    }
    render(
      <TaskContext.Provider  value={emptyList}>
        <TaskList />
      </TaskContext.Provider>
    );

    expect(screen.getByText(/No tasks available/i)).toBeInTheDocument();
  });

  it("renders a Task component for each task in the list", () => {
    const tasks = [
      { id: 1, name: "Mock Task 1" ,description:'description',deadline:'deadline',status:'status'},
      { id: 2, name: "Mock Task 2" ,description:'description',deadline:'deadline',status:'status'},
    ];
    const data = {
        tasks,
        saveNewTask: () => {},
        updateTask: () => {},
        deleteTask: () => {},
        getTask:()=>[]
    }
     render(
        <BrowserRouter>
      <TaskContext.Provider  value={data}>
        <TaskList />
      </TaskContext.Provider>
      </BrowserRouter>

    );

    expect(screen.getAllByText(/Mock Task/i)).toHaveLength(tasks.length);
  });

  // Add more tests for functionality like task deletion, editing, etc. (if applicable)
});
