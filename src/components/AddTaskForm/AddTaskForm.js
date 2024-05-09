import React, { useState } from 'react';

function AddTaskForm({ addFnc }) {
  const [taskDescription, setTaskDescription] = useState('');

  const handleChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleSubmit = () => {
    if (taskDescription.trim() !== '') {
      addFnc(taskDescription);
      setTaskDescription('');
    }
  };

  return (
    <div className="addTaskForm">
      <input
        type="text"
        id="taskDescription"
        value={taskDescription}
        onChange={handleChange}
      />
      <button type="button" onClick={handleSubmit}>
        Add
      </button>
      For example: "Task 123/21.09.2025"
    </div>
  );
}

export default AddTaskForm;
