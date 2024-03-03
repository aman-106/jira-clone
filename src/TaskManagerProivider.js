import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";

const TaskContext = createContext({
  tasks: [],
  saveNewTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
  getTask:()=>[]
});

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : [];
    return savedTasks.map((task) => ({
      ...task,
      deadline: task.deadline || "",
      status: task.status || "todo",
    }));
  });

  const saveNewTask = useCallback(
    ({ name, description, deadline, status }) => {
      const newTask = {
        id: Date.now(),
        name,
        description,
        deadline,
        status: status || "todo",
      };
      setTasks((prevTasks) => {
        const tasks = [...prevTasks, newTask];
        localStorage.setItem("tasks", JSON.stringify(tasks));
        return tasks;
      });
    },
    [tasks]
  );

  const updateTask = useCallback(
    (taskId, updateTask={}) => { // { name, description, deadline, status }
      setTasks((prevTasks) => {
        const tasks = prevTasks.map((task) =>{
          return task.id === Number(taskId)
            ? { ...task, ...updateTask }
            : task
        }

        );
        localStorage.setItem("tasks", JSON.stringify(tasks));
        return tasks;
      });
    },
    [tasks]
  );

  const deleteTask = useCallback(
    (taskId) => {
      setTasks((prevTasks) => {
        const tasks = prevTasks.filter((task) => task.id !== taskId);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        return tasks;
      });
    },
    [tasks]
  );

  const getTask = useCallback((id)=>{
    return tasks.find((task) => task.id === Number(id))
  },[tasks])

  const value = useMemo(
    () => ({
      tasks,
      saveNewTask,
      updateTask,
      deleteTask,
      getTask
    }),
    [tasks, saveNewTask, updateTask, deleteTask]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

function useTaskContext() {
  return useContext(TaskContext);
}

export { TaskContext, TaskProvider, useTaskContext };
