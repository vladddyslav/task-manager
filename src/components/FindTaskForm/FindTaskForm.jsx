import React, { useState } from 'react';

function FindTaskForm({  changeFindValue }) {

   const [elValue, setElValue] = useState('');

   const handleChange = (event) => {
      const value = event.target.value;
      changeFindValue(value)
      setElValue(value)

   };
   
   const handleKeyUp = (event) => {
      if (event.key === "Backspace") {
         setElValue(elValue);
      }
   };

   return (
      <>
         Find the task:
         <input
            type="text"
            id="findTask"
            value={elValue}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
         />
      </>
   );
}

export default FindTaskForm;