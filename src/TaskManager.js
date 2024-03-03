class TaskManager {
  constructor() {
    this.tasks = this.getTasksFromLocalStorage();
  }

  generateId() {
    return Date.now(); // Use current timestamp as ID
  }

  saveNewTask = ({title, description,deadline}) => {
    const newTask = {
      id: this.generateId(),
      title,
      description,
      deadline,
      completed: false,
    };

    this.tasks.push(newTask);
    this.saveTasksToLocalStorage();
  }

  getTasksFromLocalStorage=()=> {
    try {
      const tasksJson = localStorage.getItem('tasks');
      if (tasksJson) {
        return JSON.parse(tasksJson);
      }
    } catch (error) {
      console.error('Error parsing tasks from local storage:', error);
    }

    return [];
  }

  saveTasksToLocalStorage=()=> {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  updateTask = (taskId, {title, description, completed,deadline})=>{
    const taskIndex = this.tasks.findIndex((task) => task.id === taskId);

    if (taskIndex !== -1) {
      this.tasks[taskIndex].title = title;
      this.tasks[taskIndex].description = description;
      this.tasks[taskIndex].completed = completed;
      this.tasks[taskIndex].deadline = deadline;
      this.saveTasksToLocalStorage();
    } else {
      console.warn('Task with ID', taskId, 'not found for update');
    }
  }



  deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    this.tasks = updatedTasks;
  };

  static createInstance() {
    return new TaskManager();
  }
}


const taskManager = TaskManager.createInstance();
export { taskManager , TaskManager};
