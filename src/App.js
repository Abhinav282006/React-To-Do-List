import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return;

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].text = task;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([
        ...tasks,
        {
          text: task,
          completed: false,
        },
      ]);
    }

    setTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setTask(tasks[index].text);
    setEditIndex(index);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed =
      !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <div className="todo-box">
        <h1>📝 React To-Do List</h1>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button onClick={addTask}>
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        <p className="status">
          Total Tasks: {tasks.length}
        </p>

        <ul>
          {tasks.map((item, index) => (
            <li key={index}>
              <span
                className={item.completed ? "completed" : ""}
              >
                {item.text}
              </span>

              <div>
                <button
                  className="complete"
                  onClick={() => toggleComplete(index)}
                >
                  ✓
                </button>

                <button
                  className="edit"
                  onClick={() => editTask(index)}
                >
                  ✏️
                </button>

                <button
                  className="delete"
                  onClick={() => deleteTask(index)}
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;