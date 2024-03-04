## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.


**Project Summary: Task Manager Application**

- **Overview**: The Task Manager application is designed to help users manage their tasks efficiently. It provides features for creating, updating, and visualizing tasks through a user-friendly interface.

- **Key Components**:
  1. **TaskProvider**: A context provider component responsible for managing the state and operations related to tasks.
  2. **Appbar**: A navigation bar component that allows users to navigate between different views and functionalities of the application.
  3. **TaskList**: Displays a list of tasks in a structured format, allowing users to quickly view and interact with their tasks.
  4. **TaskBoard**: A component that visually organizes tasks into different categories or stages, providing a more visual representation of task progress.
  5. **TaskForm**: Enables users to create new tasks or edit existing ones by providing input fields for task details such as name, description, deadline, and status.

- **Routing**: The application uses React Router for client-side routing, enabling seamless navigation between different views without full page reloads.
  - The root path ("/") displays the TaskList component, showing an overview of all tasks.
  - The "/board" path renders the TaskBoard component, offering a visual representation of tasks' progress.
  - The "/task/:id?" path allows users to create new tasks or edit existing ones using the TaskForm component. The ":id" parameter enables editing of specific tasks identified by their unique IDs.

- **Lazy Loading**: The application leverages React's lazy loading feature to improve performance by dynamically loading components only when they are needed. This is particularly useful for large applications with multiple components, as it reduces the initial bundle size and speeds up the application load time.

- **Context API**: The TaskProvider component utilizes React's Context API to manage state related to tasks. This centralized state management approach ensures that task data is accessible to all components that need it, without the need for prop drilling.

- **Suspense**: React Suspense is used to handle asynchronous loading of components, providing a fallback UI (e.g., loading indicators) while the required components are being fetched. This enhances the user experience by giving feedback during component loading processes.

Overall, the Task Manager application offers a comprehensive solution for organizing and managing tasks, providing users with a streamlined interface and intuitive functionality to boost productivity and task management efficiency.