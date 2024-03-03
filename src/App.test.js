import React from "react";
import { render, screen ,waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

describe("App", () => {
  it("renders TaskList by default", async() => {
    render(
        <App />
    );
    await waitFor(() =>{
      expect(screen.getByText(/Task List/i)).toBeInTheDocument();
    });
  });

  it("navigates to Task Board", async () => {
    render(
    
        <App />
      
    );

    userEvent.click(screen.getByText('Task Board'));

    expect(screen.getByText(/Loading Task Board/i)).toBeInTheDocument()
  });

  it("navigates to Task Form", () => {
    render(
    
        <App />
      
    );

    userEvent.click(screen.getByText(/Add Task/i));
    expect(screen.getByText(/Loading Task Form.../i)).toBeInTheDocument();
  });

  it("navigates to Task Board", () => {
    render(
        <App />
    );
    userEvent.click(screen.getByText(/Task Board/i));
    expect(screen.getByText(/Loading Task Board/i)).toBeInTheDocument();
  });
});
