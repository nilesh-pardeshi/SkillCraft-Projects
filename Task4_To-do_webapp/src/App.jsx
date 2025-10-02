import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks(prev => [...prev, task]);
  const deleteTask = (id) => setTasks(prev => prev.filter(task => task.id !== id));
  const toggleComplete = (id) => setTasks(prev => prev.map(task => task.id===id ? {...task, completed: !task.completed} : task));
  const editTask = (id, updatedTask) => setTasks(prev => prev.map(task => task.id===id ? {...task, ...updatedTask} : task));

  return (
    <div className="app-container">
      <h1>To-Do : Task Manager</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} toggleComplete={toggleComplete} editTask={editTask} />
    </div>
  );
};

export default App;
