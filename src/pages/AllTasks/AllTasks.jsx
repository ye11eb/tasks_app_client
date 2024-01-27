import React, { useState } from 'react'
import './allTasks.scss'
import Task from '../../components/task/Task'


const Main = ({ tasks, setTasks }) => {
    const [underlineAfterIndex, setUnderlineAfterIndex] = useState(false)

    console.log(tasks);
    const updateTask = (task, action) => {
        let updatedTasks = []
        switch (action) {

            case 'active':
                console.log('once');
                tasks.forEach(element => {
                    if (element._id === task._id) {
                        let updatedElement = element
                        updatedElement.active = !element.active
                        updatedTasks.push(updatedElement)
                    }else{
                        let updatedElement = element
                        updatedElement.active = false
                        updatedTasks.push(updatedElement)
                    }
                })
                break;

            case 'opened':
                console.log('double');
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
    };

    const handleDragOver = (e, currentIndex) => {
        e.preventDefault();
        setUnderlineAfterIndex(currentIndex)
        console.log("Index of item under draggable item:", currentIndex);
    };

    const handleDrop = (e, newIndex) => {
        e.preventDefault();

        const oldIndex = e.dataTransfer.getData('index');
        const newItems = [...tasks];
        const [draggedItem] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, draggedItem);

        setTasks(newItems);
        setUnderlineAfterIndex(false)
    };

    return (
        <div className='tasksWrapper'>
            {tasks.map((element,index) => (                
                <Task 
                    element={element} 
                    updateTask={updateTask} 
                    tasks={tasks}
                    handleDragStart={handleDragStart}
                    handleDragOver={handleDragOver}
                    handleDrop={handleDrop}
                    index={index}
                    underlineAfterIndex={underlineAfterIndex}
                />
            ))}
        </div>
    )
}

export default Main