import React from "react";
import { render, screen,waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskForm from "./TaskForm";
import { useTaskContext } from "../TaskManagerProivider";

jest.mock("../TaskManagerProivider", () => ({
  useTaskContext: () => ({
    getTask: jest.fn(),
    saveNewTask: jest.fn(),
    updateTask: jest.fn(),
  }),
}));

describe("TaskForm component", () => {
  it("renders the initial form with correct fields", () => {
    render(<TaskForm />);

    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Deadline/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status/)).toBeInTheDocument();
    expect(screen.getByRole('button',{name:/Add Task/i})).toBeInTheDocument();
  });




  it.only("handles form submission for new tasks", async () => {
    const {debug,getByLabelText } = render(<TaskForm />);
    debug();
    const nameInput = getByLabelText(/Name/i);
    const descriptionInput = screen.getByLabelText("Description *");
    const deadlineInput = screen.getByLabelText("Deadline *");
    const statusSelect =  screen.getByRole("combobox", { name: /Status/ });;
    await userEvent.type(nameInput, "Test Task");
    userEvent.type(descriptionInput, "This is a test task");
    userEvent.type(deadlineInput, "2024-03-10");
    // userEvent.selectOptions(statusSelect, ["todo"]);

    const submitButton = screen.getByRole('button',{name:"Add Task"});
    userEvent.click(submitButton);

    await waitFor(() => {
        expect(useTaskContext().saveNewTask).toHaveBeenCalled();
    //   expect(useTaskContext().saveNewTask).toHaveBeenCalledWith({
    //     name: 'Test Task',
    //     description: 'This is a test task',
    //     deadline: '2024-03-10',
    //     status: 'todo'
    //   });
    });

    expect(
      screen.getByText("Task added successfully.")
    ).toBeInTheDocument();
  });
});
