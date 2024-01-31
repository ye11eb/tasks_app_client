import React, { useEffect, useState } from 'react'
import { CheckListItem } from '../checkListItem/CheckListItem'
const OpenedTaskBody = ({element, setTasks, tasks}) => {
    const [checkBoxes, setCheckBoxes] = useState(element.checkList)

    useEffect(() => {
        let updatedTasks = []
        tasks.forEach(task => {
          if (task !== element) {
            updatedTasks.push(task)
          }else{
            let updatedCheckBox = element;
            element.checkList = checkBoxes
            updatedTasks.push(updatedCheckBox)
          }
        });
        setTasks(tasks)
    }, [checkBoxes])
    
    return (
        <div className="taskBody">
            {element?.description && <p className="description">
                {element?.description}
            </p>}
            {checkBoxes?.map((el) => (
                <CheckListItem 
                    el={el} 
                    checkBoxes={checkBoxes}
                    setCheckBoxes={setCheckBoxes}
                />
            ))}
            <div className="taskBottom">
                {element?.labels?.map((label) => (
                    <div className="labelWrapper">
                        <p>{label}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OpenedTaskBody