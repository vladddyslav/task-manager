import "./taskItem.css"
import { useState } from "react";
import React from 'react';

function TaskItem({ itemKey, txt, priority, delFnc, upPriority, downPriority, deadlineValue, updateDropKey, updateRemoveKey,handleCheck,checked }) {

  const [isEditingDeadline, setIsEditingDeadline] = useState(false);
  const [deadline, setDeadline] = useState(deadlineValue);
  const [progressValue, setProgressValue] = useState("2");

  const handleDeadlineClick = () => {
    setIsEditingDeadline(true);
  };

  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
  };

  const handleDeadlineBlur = () => {
    setIsEditingDeadline(false);
  };

  const handleProgressChange = (event) => {
    setProgressValue(event.target.value);
  };

  const dragStartHandler = (e, txt, itemKey) => {
    updateRemoveKey(itemKey);
  }
  const dragLeaveHandler = (e) => {
    e.target.style.border = ""

  }

  const dragEndHandler = (e) => {
    e.target.style.border = ""

  }

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.target.style.border = "0.2rem solid red"
  }

  const dragDropHandler = (e, itemKey) => {
    e.preventDefault();
    updateDropKey(itemKey)
  }

  const backgroundColor =
    priority === 1 ? "green" : priority === 2 ? "blue" : "red";

  return (
    <div
      className="taskItem"
      style={{ backgroundColor }}
      draggable={true}
      onDragStart={(e) => dragStartHandler(e, txt, itemKey)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dragDropHandler(e, itemKey)}
    >
      {txt}
      <button onClick={delFnc}>Del</button>
      Priority: {priority}
      <button onClick={upPriority}>+</button>
      <button onClick={downPriority}>-</button>


      <span
        onClick={handleDeadlineClick}
        style={{ cursor: "pointer" }}
      >
        Deadline:
        {isEditingDeadline ? (
          <input
            type="text"
            value={deadline}
            onChange={handleDeadlineChange}
            onBlur={handleDeadlineBlur}
            autoFocus
          />
        ) : (
          <span>{deadline}</span>
        )}
      </span>
        <input
        type="checkbox"
        checked={checked}
        onChange={() => handleCheck(itemKey,checked)}
        >
        </input>
      <br /> Progress:
      <input
        type="range"
        min="0"
        max="100"
        value={progressValue}
        onChange={handleProgressChange}
      />
    </div>
  );
}

export default TaskItem;