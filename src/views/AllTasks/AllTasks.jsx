

import React, { useState } from 'react'
import './allTasks.scss'
import Task from '../../components/task/Task'


const AllTasks = ({ tasks, setTasks, theme }) => {
    const [underlineAfterIndex, setUnderlineAfterIndex] = useState(false)
    const [mousePos, setMousePos] = useState();
    const [prevIndex, setPrevIndex] = useState(false)

    // console.log(tasks);
    const updateTask = (task, action) => {
        let updatedTasks = []
        switch (action) {

            case 'active':
                // console.log('once');
                tasks.forEach(element => {
                    if (element._id === task._id) {
                        let updatedElement = element
                        updatedElement.active = !element.active
                        updatedTasks.push(updatedElement)
                    }else{
                        let updatedElement = element
                        updatedElement.active = false
                        updatedElement.opened = false
                        updatedTasks.push(updatedElement)
                    }
                })
                break;

            case 'opened':
                // console.log('double');
                tasks.forEach(element => {
                    if (element._id === task._id) {
                        let updatedElement = element
                        updatedElement.opened = !element.opened
                        updatedTasks.push(updatedElement)
                    }else{
                        let updatedElement = element
                        updatedElement.opened = false
                        updatedTasks.push(updatedElement)
                    }
                })
                break;

            default:
                break;
        }
        setTasks(updatedTasks)
    }

    const handleDragStart = (e, index) => {
        
        e.dataTransfer.setData('index', index);
        setPrevIndex(index);
    };

    const handleDragOver = (e, currentIndex) => {
        e.preventDefault();
        setUnderlineAfterIndex(currentIndex)
        console.log('====================================');
        console.log(currentIndex);
        console.log('====================================');
        // console.log("Index of item under draggable item:", currentIndex);
    };

    const handleDrop = (e, newIndex, handleSetTaskVisible) => {
        console.log('====================================');
        console.log(newIndex);
        console.log('====================================');
        e.preventDefault();

        const oldIndex = e.dataTransfer.getData('index');
        const newItems = [...tasks];
        const [draggedItem] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, draggedItem);

        setTasks(newItems);
        setUnderlineAfterIndex(false)
        handleSetTaskVisible()
    };

    return (
        <div className='tasksWrapper'
            onMouseLeave={() => setUnderlineAfterIndex(false)}
        >
            {tasks.map((element,index) => (                
                <Task 
                    element={element} 
                    updateTask={updateTask} 
                    tasks={tasks}
                    setTasks={setTasks}
                    handleDragStart={handleDragStart}
                    handleDragOver={handleDragOver}
                    handleDrop={handleDrop}
                    index={index}
                    underlineAfterIndex={underlineAfterIndex}
                    theme={theme}
                    mousePos={mousePos}
                    prevIndex={prevIndex}
                />
            ))}
        </div>
    )
}

export default AllTasks