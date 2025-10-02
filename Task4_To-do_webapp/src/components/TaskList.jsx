import React, { useState } from 'react';

const TaskList = ({ tasks, deleteTask, toggleComplete, editTask }) => {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDueDate, setEditDueDate] = useState('');

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditDueDate(task.dueDate);
  };

  const saveEdit = (id) => {
    editTask(id, { title: editTitle, description: editDescription, dueDate: editDueDate });
    setEditingId(null);
  };

  return (
    <div className="task-list">
      {tasks.length === 0 && <p>No tasks added yet.</p>}
      {tasks.map(task => (
        <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
          {editingId === task.id ? (
            <>
              <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} />
              <input type="text" value={editDescription} onChange={e => setEditDescription(e.target.value)} />
              <input type="datetime-local" value={editDueDate} onChange={e => setEditDueDate(e.target.value)} />
              <button onClick={() => saveEdit(task.id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              {task.dueDate && <p>Due: {new Date(task.dueDate).toLocaleString()}</p>}
              <div className="task-actions">
                <button onClick={() => toggleComplete(task.id)}>{task.completed ? 'Undo' : 'Complete'}</button>
                <button onClick={() => startEditing(task)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
