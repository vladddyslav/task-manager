import './taskList.css'
import React, { useEffect, useState } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import FindTaskForm from '../FindTaskForm/FindTaskForm';

function TaskList() {
  const [items, setItems] = useState([
    { key: "1", txt: "Task 1", priority: 1, deadline: "15.03.24", checked: false},
    { key: "2", txt: "Task 2", priority: 1, deadline: "01.05.24" , checked: false},
    { key: "3", txt: "Task 3", priority: 3, deadline: "25.06.24" , checked: false},
    { key: "4", txt: "Task 4", priority: 2, deadline: "22.03.24" , checked: false},
    { key: "5", txt: "Task 5", priority: 1, deadline: "21.06.24" , checked: false},
    { key: "6", txt: "Task 6", priority: 3, deadline: "23.03.24" , checked: false}
  ]);
  const [filtrPriority, setFiltrPriority] = useState(0); // значение параметра фильтра
  const [findValue, setFindValue] = useState("");  // значение поискового поля
  const [removeAndDropKeys, setRemoveAndDropKeys] = useState({ removeKey: 0, dropKey: 0 }); // обьект который тянем и на место которого тянем
  const [checkedItems, setCheckedItems] = useState([])

  const updateRemoveKey = (newValue) => {
    setRemoveAndDropKeys(prevState => {
      return { ...prevState, removeKey: newValue };
    });
  };

  const updateDropKey = (newValue) => {
    setRemoveAndDropKeys(prevState => {
      return { ...prevState, dropKey: newValue };
    });
  };

  function swapElementsInArray() {
    const arr = items;
    if (removeAndDropKeys.dropKey > 0 && removeAndDropKeys.removeKey > 0) {
      const removeIndex = arr.findIndex(item => item.key === removeAndDropKeys.removeKey);
      const dropIndex = arr.findIndex(item => item.key === removeAndDropKeys.dropKey);
      const temp = arr[removeIndex];
      arr[removeIndex] = arr[dropIndex];
      arr[dropIndex] = temp;
      setItems(arr);
    } else {
      console.log("пустой стейт")
    }
  }


  const renderItemsList = (arr) => {
    const findResult = arr.filter((el) => el.txt.includes(findValue))
    // const afterSwap = swapElementsInArray(findResult);
    return findResult.map(item => (
      <TaskItem
        itemKey={item.key}
        txt={item.txt}
        priority={item.priority}
        delFnc={() => delFnc(item.key)}
        upPriority={() => handleChangePriorityUp(item.key)}
        downPriority={() => handleChangePriorityDown(item.key)}
        deadlineValue={item.deadline}
        updateRemoveKey={updateRemoveKey}
        updateDropKey={updateDropKey}
        swapElementsInArray={swapElementsInArray}
        handleCheck={handleCheck}
        checked={item.checked}
      />
    ));
  }

  const addFnc = (txtTask) => {

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

    setItems([...items, newItem]);
  };

  const delFnc = (itemKey) => {
    if (Array.isArray(itemKey)) {
      console.log(items)
      console.log("Deleting keys:", itemKey);
      const newItems = items.filter(item => !itemKey.includes(item.key));
      setItems(newItems);
      setCheckedItems([])
    } else {
      console.log("Deleting key:", itemKey);
      const newItems = items.filter(item => item.key !== itemKey);
      setItems(newItems);
    }

  };

  const handleChangePriorityUp = (key) => {
    const updatedItems = items.map(item => {
      if (item.key === key) {
        if (item.priority < 3) {
          return { ...item, priority: item.priority + 1 };
        }
      }
      return item;
    });
    setItems(updatedItems);
  }

  const handleChangePriorityDown = (key) => {
    const updatedItems = items.map(item => {
      if (item.key === key) {
        if (item.priority > 1) {
          return { ...item, priority: item.priority - 1 };
        }
      }
      return item;
    });
    setItems(updatedItems);
  }

  const priorityFiltr = (priority) => {
    const newTaskList = items.filter(item => item.priority === priority)
    return newTaskList;
  }
  const handlePriorityFiltr = (event) => {
    const selectedPriority = parseInt(event.target.value);
    setFiltrPriority(selectedPriority);
  }
  const handleCheck = (key,checked) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.key === key ? { ...item, checked: !item.checked } : item
      ));
    setCheckedItems(prevCheckedItems => [...prevCheckedItems, key]);
    }



  return (
    <>
      <div className="taskList">
        TASK LIST:
        <br />
        <label for="cars">Choose a priority:</label>
        <select id="cars" name="cars" onChange={handlePriorityFiltr}>
          <option value="0">All</option>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
        <br />
        <FindTaskForm changeFindValue={setFindValue} />
        <button
          onClick={() => delFnc(checkedItems)}
          style={{ display: checkedItems.length > 0 ? 'inline-block' : 'none' }}

        >Del checked Tasks</button>
        {filtrPriority >= 1 ? renderItemsList(priorityFiltr(filtrPriority)) : renderItemsList(items)}
      </div>
      <AddTaskForm addFnc={addFnc} />
    </>
  );
}


export default TaskList;