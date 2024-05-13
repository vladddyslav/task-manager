import './taskList.css'
import React, { useEffect, useState } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import FindTaskForm from '../FindTaskForm/FindTaskForm';
import tasksData from '../tasksData';

function TaskList() {

  const [tasks, setTasks] = useState(tasksData);
  const [filterPriority, setFilterPriority] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [dragAndDropKeys, setDragAndDropKeys] = useState({ removeKey: 0, dropKey: 0 }); 
  const [selectedTasks, setSelectedTasks] = useState([])

  const updateRemoveKey = (newValue) => {
    setDragAndDropKeys(prevState => {
      return { ...prevState, removeKey: newValue };
    });
  };

  const updateDropKey = (newValue) => {
    setDragAndDropKeys(prevState => {
      return { ...prevState, dropKey: newValue };
    });
  };

  useEffect(() => {

    const arr = [...tasks];
    if (dragAndDropKeys.dropKey > 0 && dragAndDropKeys.removeKey > 0) {
      const removeIndex = arr.findIndex(item => item.key === dragAndDropKeys.removeKey);
      const dropIndex = arr.findIndex(item => item.key === dragAndDropKeys.dropKey);
      const temp = arr[removeIndex];
      arr[removeIndex] = arr[dropIndex];
      arr[dropIndex] = temp;
      setTasks(arr);
      updateDropKey(0)
    } else {
      console.log("пустой стейт")
    }
  }, [dragAndDropKeys])


  function swapTasksInArray() {
    const arr = tasks;
    if (dragAndDropKeys.dropKey > 0 && dragAndDropKeys.removeKey > 0) {
      const removeIndex = arr.findIndex(item => item.key === dragAndDropKeys.removeKey);
      const dropIndex = arr.findIndex(item => item.key === dragAndDropKeys.dropKey);
      const temp = arr[removeIndex];
      arr[removeIndex] = arr[dropIndex];
      arr[dropIndex] = temp;
      setTasks(arr);
    } else {
      console.log("пустой стейт")
    }
  }


  const renderTaskItems  = (arr) => {
    const findResult = arr.filter((el) => el.txt.includes(searchTerm))

    return findResult.map(item => (
      <TaskItem
        itemKey={item.key}
        txt={item.txt}
        priority={item.priority}
        deleteTask ={() => deleteTask (item.key)}
        increasePriority ={() => increasePriority (item.key)}
        decreasePriority={() => decreasePriority(item.key)}
        deadlineValue={item.deadline}
        updateRemoveKey={updateRemoveKey}
        updateDropKey={updateDropKey}
        handleCheck={handleCheck}
        checked={item.checked}
      />
    ));
  }

  const addTask = (txtTask) => {

    const itemValue = txtTask.split("/")
    const newItem =
    {
      key: Date.now(),
      txt: itemValue[0],
      priority: 1,
      deadline: itemValue[1]
    };
    console.log(newItem.key)
    console.log("New item:", newItem.txt);

    setTasks([...tasks, newItem]);
  };

  const deleteTask  = (itemKey) => {
    if (Array.isArray(itemKey)) {
      console.log(tasks)
      console.log("Deleting keys:", itemKey);
      const newItems = tasks.filter(item => !itemKey.includes(item.key));
      setTasks(newItems);
      setSelectedTasks([])
    } else {
      console.log("Deleting key:", itemKey);
      const newItems = tasks.filter(item => item.key !== itemKey);
      setTasks(newItems);
    }

  };

  const increasePriority  = (key) => {
    const updatedItems = tasks.map(item => {
      if (item.key === key) {
        if (item.priority < 3) {
          return { ...item, priority: item.priority + 1 };
        }
      }
      return item;
    });
    setTasks(updatedItems);
  }

  const decreasePriority = (key) => {
    const updatedItems = tasks.map(item => {
      if (item.key === key) {
        if (item.priority > 1) {
          return { ...item, priority: item.priority - 1 };
        }
      }
      return item;
    });
    setTasks(updatedItems);
  }

  const priorityFilter = (priority) => {
    const newTaskList = tasks.filter(item => item.priority === priority)
    return newTaskList;
  }
  const handlePriorityFilter = (event) => {
    const selectedPriority = parseInt(event.target.value);
    setFilterPriority(selectedPriority);
  }
  const handleCheck = (key, checked) => {
    setTasks(prevItems =>
      prevItems.map(item =>
        item.key === key ? { ...item, checked: !item.checked } : item
      ));
    setSelectedTasks(prevCheckedItems => [...prevCheckedItems, key]);
  }



  return (
    <>
      <div className="task-list">
        TASK LIST:
        <br />
        <label for="cars">Choose a priority:</label>
        <select id="cars" name="cars" onChange={handlePriorityFilter}>
          <option value="0">All</option>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
        <br />
        <FindTaskForm changeFindValue={setSearchTerm} />
        <button
          onClick={() => deleteTask (selectedTasks)}
          style={{ display: selectedTasks.length > 0 ? 'inline-block' : 'none' }}

        >Del checked Tasks</button>
        {filterPriority >= 1 ? renderTaskItems (priorityFilter(filterPriority)) : renderTaskItems (tasks)}
      </div>
      <AddTaskForm addTask={addTask} />
    </>
  );
}


export default TaskList;