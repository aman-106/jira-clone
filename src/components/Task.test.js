import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Task from "./Task";
import { BrowserRouter} from "react-router-dom";
import { TaskContext } from "../TaskManagerProivider"; // Import the actual provider


describe("Task", () => {
  it("renders a Task details", () => {
    const task = {
      id: 1,
      name: "Mock Task 1",
      description: "description",
      deadline: "deadline",
      status: "status",
    };
    const data = {
      tasks: [task],
      saveNewTask: () => {},
      updateTask: () => {},
      deleteTask: () => {},
      getTask: () => [],
    };
    const {getByText} = render(
      <BrowserRouter>
        <TaskContext.Provider value={data}>
          <Task task={task}/>
        </TaskContext.Provider>
      </BrowserRouter>
    );
    expect(getByText(task.name)).toBeInTheDocument();
    expect(getByText(task.description)).toBeInTheDocument();
  });

  it("calls deleteTask function when delete button is clicked", async () => {
    const deleteTaskMock = jest.fn();
    const task = {
        id: 1,
        name: "Mock Task 1",
        description: "description",
        deadline: "deadline",
        status: "status",
      };
      const data = {
        tasks: [task],
        saveNewTask: () => {},
        updateTask: () => {},
        getTask: () => {},
        deleteTask: deleteTaskMock,
      };
      const {getByRole} = render(
        <BrowserRouter>
          <TaskContext.Provider value={data}>
            <Task task={task}/>
          </TaskContext.Provider>
        </BrowserRouter>
      );


    const deleteButton = getByRole("button", { name: /Delete/i });
   await userEvent.click(deleteButton);

    expect(deleteTaskMock).toHaveBeenCalledWith(task.id);
  });

});
