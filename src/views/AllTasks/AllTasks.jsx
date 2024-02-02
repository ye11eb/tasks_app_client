

import React, { useState } from 'react'
import './allTasks.scss'
import Task from '../../components/task/Task'
import arrowGroupTask from '../../media/white/arrowGroupTask.svg'
import { Group } from '../../components/group/Group'
import groupIcon from '../../media/GroupIcon.svg'

const AllTasks = ({ tasks, setTasks, theme }) => {
    const [underlineAfterIndexAllTasks, setUnderlineAfterIndexAllTask] = useState(false)
    const [underlineAfterIndexGroup, setUnderlineAfterIndexGroup] = useState(false)
    const [prevIndexAllTasks, setPrevIndexAllTasks] = useState(false)
    const [prevIndexGroup, setPrevIndexGroup] = useState(false)
    const [willBeGroup, setWillBeGroup] = useState(false)
    const [groupArray, setGroupArray] = useState([])
    const [whereTaskComesFrom, setWhereTaskComesFrom] = useState()
    const [indexSecAgo, setIndexSecAgo] = useState(false)

    // document.body.style.cursor = groupIcon
    // document.getElementsByTagName("body")[0].style.cursor = 'wait';
    document.getElementsByTagName("body")[0].style.cursor = '../../media/GroupIcon.svg';
    // document.getElementsByTagName("body")[0].style.cursor = "url('http://wiki-devel.sugarlabs.org/images/e/e2/Arrow.cur'), auto";
    // var elementToChange = document.getElementsByTagName("body")[0];
    // elementToChange.style.cursor = "url('../../media/GroupIcon.svg'), auto";
    // const handleUpd

    const updateTask = (task, action, group) => {
        let updatedTasks = []
        let updatedGroupTasks = []
        switch (action) {

            case 'active':
                if (group) {
                    group.tasks.forEach(element => {
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
                }else{
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
                }
               
                break;

            case 'opened':
                if (group) {
                    group.tasks.forEach(element => {
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
                }else{
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
                }
                break;

            default:
                break;
        }
        if (group) {
            // let updatedGroupsArray = groupArray
            let updatedGroup = group
            updatedGroup.tasks = updatedTasks
            console.log('====================================');
            console.log(group);
            console.log('====================================');
            console.log('====================================');
            console.log(updatedGroup);
            console.log('====================================');
            // updatedGroupsArray.indexOf(group)
            // let updatedGroup = updatedGroupsArray[updatedGroupsArray.indexOf(group)]
            // console.log(updatedGroup);
            // updatedGroup.tasks = updatedTasks
            setGroupArray([updatedGroup])
        }else{
            setTasks(updatedTasks)
        }
        
    }

    const handleDragStart = (e, index, from, group) => {
        e.dataTransfer.effectAllowed = "copyMove";
        setWhereTaskComesFrom(from)
        e.dataTransfer.setData('index', index);
        e.dataTransfer.setData('group', group);
        switch (from) {
            case 'allTasks':
                setUnderlineAfterIndexAllTask(index)
                setPrevIndexAllTasks(index)
                break;
            case 'AllTasksGroup':
                setUnderlineAfterIndexGroup(index)
                setPrevIndexGroup(index)
            break;
        
            default:
                break;
        }
    };

    let startDate = Date.now()
    const handleDragOver = (e, currentIndex, from) => {

        if (Date.now() - startDate > 1000 ) {
            setWillBeGroup(true)
        }

        if (currentIndex !== indexSecAgo) {
            setWillBeGroup(false)
        }


        setIndexSecAgo(currentIndex)
        e.preventDefault();
        switch (from) {
            case 'allTasks':
                setUnderlineAfterIndexAllTask(currentIndex)
                setUnderlineAfterIndexGroup(false)
                break;
            case 'AllTasksGroup':
                setUnderlineAfterIndexGroup(currentIndex)
                setUnderlineAfterIndexAllTask(false)
            break;
        
            default:
                setUnderlineAfterIndexAllTask(false)
                setUnderlineAfterIndexGroup(false)
                break;
        }
    };

    const handleDrop = (e, newIndex, handleSetTaskVisible, from, group) => {
        switch (whereTaskComesFrom) {
            case 'allTasks':
                if (group) {
                    let newGroupTasks = group.tasks
                    const oldIndex = e.dataTransfer.getData('index');
                    newGroupTasks.push(tasks[oldIndex])

                    let groupsArray = []
                    groupArray.forEach((el) => {
                        if (el !== group) {
                            groupsArray.push(el)
                        }else{
                            let updatedGroup = el
                            updatedGroup.tasks = newGroupTasks
                            groupsArray.push(updatedGroup)
                        }
                    })

                    let updatedAllTasks = tasks.filter(item => item !== tasks[oldIndex])
                    setTasks(updatedAllTasks)
                    setGroupArray(groupsArray)
                }else{
                    if (!willBeGroup) {
                        const oldIndex = e.dataTransfer.getData('index');
                        const newItems = [...tasks];
                        const [draggedItem] = newItems.splice(oldIndex, 1);
                        let updatedTasks = newItems
                        updatedTasks.splice(newIndex, 0, draggedItem);
                        setTasks(newItems);
                        setUnderlineAfterIndexAllTask(false)
                        handleSetTaskVisible()
                    }else{
                        let firstTask = tasks[prevIndexAllTasks]
                        let secondTask = tasks[newIndex]
                        const newItems = [...tasks];
                        setGroupArray([...groupArray,{title: 'new group', tasks: [firstTask, secondTask]}])
                        let updatedTasks = newItems.filter(item => item !== firstTask && item !== secondTask)
                        setTasks(updatedTasks)
                        setUnderlineAfterIndexAllTask(false)
                        setWillBeGroup(false)
                        
                    }
                }

                break;

            case 'AllTasksGroup':
                if (!willBeGroup) {
                    if (group) {
                        const oldIndex = e.dataTransfer.getData('index');
                        const newItems = [...group.tasks];
                        const [draggedItem] = newItems.splice(oldIndex, 1);
                        let indexOfgroup = [groupArray.indexOf(group)]
                        let updatedTasks = newItems
                        updatedTasks.splice(newIndex, 0, draggedItem);

                        const updatedGroupsArray = groupArray
                        updatedGroupsArray[indexOfgroup].tasks = updatedTasks
                        setGroupArray(updatedGroupsArray);
                        setUnderlineAfterIndexAllTask(false)
                        handleSetTaskVisible()
                    }else{
                        const oldIndex = e.dataTransfer.getData('index');
                        let oldGroupItems = [...groupArray[0].tasks]
                        const [draggedItem] = oldGroupItems.splice(oldIndex, 1);
                        // const newItems = [...tasks];
                        let updatedTasks = tasks
                        updatedTasks.splice(newIndex, 0, draggedItem);

                        const updatedGroupsArray = groupArray
                        updatedGroupsArray[0].tasks = oldGroupItems
                        if (oldGroupItems.length < 1) {
                            setGroupArray([]);
                        }else{
                            setGroupArray(updatedGroupsArray);
                        }
                        setTasks(updatedTasks)

                    }  
                }else{
                    if (groupArray.length > 1) {
                        let newGroupItems = [...groupArray];
                        let Task = tasks[prevIndexAllTasks]
                        newGroupItems[0].tasks.splice(newIndex,0,Task)
                        let updatedGroupArray = []
                        setGroupArray(newGroupItems)
                    } 
                }
            break;
        
            default:
                break;
        }
        e.preventDefault();
        setUnderlineAfterIndexAllTask(false)
        setUnderlineAfterIndexGroup(false)
        handleSetTaskVisible()
        setPrevIndexGroup(false)
        setPrevIndexAllTasks(false)
    };

    // const handleReplaceTask = ({fstArray, secArray}) => {

    // }

    return (
        <div className='tasksWrapper'
            onMouseLeave={() => setUnderlineAfterIndexAllTask(false)}
        >       
            {groupArray.map((group) => (                
                <Group
                    groupArray={groupArray}
                    group={group}
                    indexSecAgo={indexSecAgo}
                    updateTask={updateTask} 
                    tasks={tasks}
                    setTasks={setTasks}
                    handleDragStart={handleDragStart}
                    handleDragOver={handleDragOver}
                    handleDrop={handleDrop}
                    underlineAfterIndex={underlineAfterIndexGroup}
                    theme={theme}
                    prevIndex={prevIndexGroup}
                />
            ))}
            
            {tasks.map((element,index) => (                
                <Task 
                    element={element} 
                    updateTask={updateTask} 
                    tasks={tasks}
                    willBeGroup={willBeGroup}
                    setTasks={setTasks}
                    handleDragStart={handleDragStart}
                    handleDragOver={handleDragOver}
                    handleDrop={handleDrop}
                    index={index}
                    underlineAfterIndex={underlineAfterIndexAllTasks}
                    theme={theme}
                    prevIndex={prevIndexAllTasks}
                    indexSecAgo={indexSecAgo}
                />
            ))}
            {/* {willBeGroup && <p>fdsfsdfsdf</p>} */}
        </div>
    )
}

export default AllTasks