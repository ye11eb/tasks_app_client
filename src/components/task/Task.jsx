import React, { useEffect, useRef, useState } from 'react'
import './task.scss'
import dayjs from 'dayjs';
import Icons from '../../utils/ThemeIconPicker'
import OpenedTaskBody from './components/OpenedTaskBody/OpenedTaskBody';
import Progress from '../dropdowns/Progress';
import { Prority } from '../dropdowns/Prority';

const Task = ({ 
    groupArray,
    element,
    tasks,
    setTasks,
    updateTask,
    handleDragStart,
    handleDragOver,
    handleDrop,
    index,
    underlineAfterIndex,
    prevIndex,
    fromGroup,
    indexSecAgo,
    group,
    dataZone,
    willBeGroup,
    theme }) => {
    // console.log(element);
    const [active, setActive] = useState(element.active)
    const [opened, setOpened] = useState(element.opened)
    const [openedAnim, setOpenedAnim] = useState(false)
    const [calendarActImg, setClandarActImg] = useState(Icons.calendarActiveIcon)
    const [daysToPickedDate, setDaysToPickedDate] = useState(0)
    const [progress, setProgress] = useState({title: element.other?.default?.progress})
    const [priority, setPriority] = useState({title: element.other?.default?.priority})
    const [currentTaskDragged, setCurrentTaskDragged] = useState(false)
    const [onThisTaskDrag, setOnThisTaskDrag] = useState(false)

    const fatherArrayForTask = group ? group.tasks :tasks;

    const taskRef = useRef()

    const progressVariants = [
        {title: 'To Do', icon: Icons.ToDoIcon},
        {title: 'On Testing', icon: Icons.OnTestingIcon},
        {title: 'In Progress', icon: Icons.InProgressIcon},
        {title: 'Done', icon: Icons.DoneIcon}
    ]
    const [openSelectProgress, setOpenSelectProgress] = useState(false)

    //priority
    const priorityVariants = [
        {title: 'High', icon: Icons.FlagRedIcon},
        {title: 'Medium', icon: Icons.FlagOrangeIcon},
        {title: 'None', icon: Icons.FlagGrayIcon}
    ]
    const [openSelectPriority, setOpenSelectPriority] = useState(false)

    let currentDate = dayjs(new Date())
    let elementDate = dayjs(element?.date)


    useEffect(() => {
        setOpened(element.opened)
        setActive(element.active)
    }, [element, tasks])

    const calendarImgFunc = () => {
        if (currentDate?.$D === elementDate?.$D) {
            setClandarActImg(Icons.todayIcon)
        }else if (elementDate?.$D - currentDate?.$D === 1) {
            setClandarActImg(Icons.tomorowIcon)
        }else if (currentDate?.$M === elementDate?.$M && elementDate?.$D - currentDate?.$D) {
            setClandarActImg(Icons.calendarActiveIcon)
            setDaysToPickedDate(elementDate?.$D - currentDate?.$D)
            // console.log(elementDate?.$D - currentDate?.$D);
        }else{
            setClandarActImg(Icons.calendarGrayIcon)
        }
    }

    const handleOpenDropdowns = (setState, state) => {
        if (opened) {
            setState(!state) 
        }
    }

    useEffect(() => {
        calendarImgFunc()
    }, [])

    useEffect(() => {
        setOnThisTaskDrag(indexSecAgo === index)
    }, [indexSecAgo])
    

    useEffect(() => {
        setOpenedAnim(element.opened)
    }, [opened])

    useEffect(() => {
        if (group) {
            setOpened(element.opened)
            setActive(element.active)
        }
    }, [groupArray])

    

    const handleSetTaskVisible = () => {
        // setCurrentTaskDragged(false)
    }

    const handleDrags = (e, index, value) => {
        switch (value) {
            case 'handleDragStart':
                handleDragStart(e, index, fromGroup ? 'AllTasksGroup' : 'allTasks', group)
                setCurrentTaskDragged(true)
            break;
            case 'handleDragOver':
                handleDragOver(e, index, fromGroup ? 'AllTasksGroup' : 'allTasks', group)
                setCurrentTaskDragged(false)
            break;
            case 'handleDrop':
                handleDrop(e, index, handleSetTaskVisible, fromGroup ? 'AllTasksGroup' : 'allTasks', group)
                setCurrentTaskDragged(false)
            break;
        
            default:
                break;
        }
    }

    const handleUpdateTask = (key) => {
        switch (key) {
            case 'active':
                updateTask(element, 'active', group)
                break;
        
            case 'opened':
                if (opened) {
                    setOpenedAnim(false)
                    setTimeout(() => {
                        // console.log('updateTask(element, opened, group)');
                        updateTask(element, 'opened', group)
                        setOpened(true)
                    }, 300);
                }else{
                    updateTask(element, 'opened', group)
                    setOpenedAnim(false)
                    setOpened(false)
                }
                
            break;
            default:
                break;
        }
    }

    if (taskRef.current) {
        taskRef.current.dataset.group = 'true'
    }

    if (currentTaskDragged) {
        var app = document.getElementById("root");
        app?.classList.add("grabbingToGroup");
    }

    console.log(opened);
    
    return (
        <div className={
            prevIndex === index ? `taskWrapper taskWrapperHidden` : opened ? `taskWrapper taskWrapperActive opened ${currentTaskDragged ? 'currentTaskDragged' : ''} ${openedAnim ? ' wrapperOpenedAnim' : ''}` 
            : active ? `taskWrapper taskWrapperActive ${currentTaskDragged ? 'currentTaskDragged' : ''} ${openedAnim ? ' wrapperOpenedAnim' : ''}` 
            : `taskWrapper notActiveTaskWrapper ${currentTaskDragged ? 'currentTaskDragged' : ''} ${openedAnim ? ' wrapperOpenedAnim' : ''}`   
        }   
            // title="drop to create group"
            data-zone={dataZone}
            ref={taskRef}
            onClick={() => handleUpdateTask('active')}
            onDoubleClick={() => handleUpdateTask('opened')}
            draggable
            onDragStart={(e) => handleDrags(e, index, 'handleDragStart')}
            onDragOver={(e) => handleDrags(e, index, 'handleDragOver')}
            onDrop={(e) => handleDrags(e, index, 'handleDrop')}
        >   
            {underlineAfterIndex === index && underlineAfterIndex !== prevIndex && index !== fatherArrayForTask.length-1 && prevIndex > index && (
                <div className="holderToshowDragged" />
            )}
            <div className={`holderToshowDragged ${underlineAfterIndex === index && underlineAfterIndex !== prevIndex && index !== fatherArrayForTask.length-1 && prevIndex > index ? 'holderToshowDraggedShowed' : ''}`} />

            <div className={`taskTop ${group} ${onThisTaskDrag ? ' taskTopDimmed' : ''}`}>
                {willBeGroup && onThisTaskDrag && <div className="onDropText">
                    <p>drop to create group</p>
                </div>}
                <div className="checkListItemsLeft">
                    <img src={Icons.taskIcon} alt="" />
                    <p>{element.title}</p>
                    {!opened && <div className="taskIcons">
                        {element?.description?.length >= 2 && <img src={Icons.descriptonIcon} alt='descriptonIcon'/>}
                        {element?.checkList?.length >= 1 && <img src={Icons.checkListIcon} alt='checkListIcon'/>} 
                        {element?.labels?.length >= 1 && <img src={Icons.labelIcon} alt='labelIcon'/>}
                    </div>}
                </div>

                <div className="checkListItemsRight">
                    <div className="checkListItemsRightPosible">
                        {element.other?.posible?.repeat && <img src={Icons.repeatIcon} alt='repeatIcon'/>} 
                        {element.other?.posible?.alarm && <img src={Icons.alarmIcon} alt='alarmIcon'/>}  
                    </div>

                    {currentDate?.$M === elementDate?.$M && elementDate?.$D - currentDate?.$D > 1 ?
                        <div className="checkListItemsRightDate">
                            <img src={calendarActImg} alt="" />
                            <p>{daysToPickedDate}</p>
                        </div> 
                    : 
                        <div className="checkListItemsRightDate">
                            <img src={calendarActImg} alt=""/>
                        </div> 
                    }

                    <div className="checkListItemsRightDefault">
                        <div className="defaultImgWrapper"
                            onClick={() => handleOpenDropdowns(setOpenSelectProgress, openSelectProgress)}
                        >
                            {progress.title === '' && <img src={Icons.ToDoIcon} alt='ToDo'/>} 
                            {progress.title === 'To Do' && <img src={Icons.ToDoIcon} alt='ToDo'/>} 
                            {progress.title === 'On Testing' && <img src={Icons.OnTestingIcon} alt='InProgress' />} 
                            {progress.title === 'In Progress' && <img src={Icons.InProgressIcon} alt='OnTesting' />} 
                            {progress.title === 'Done' && <img src={Icons.DoneIcon} alt='Done' />} 
                        </div>

                        <div className="defaultImgWrapper"
                            onClick={() => handleOpenDropdowns(setOpenSelectPriority, openSelectPriority)}
                        >
                            {priority.title === '' && <img src={Icons.FlagGrayIcon} alt='ToDo'/>} 
                            {priority.title === 'None' && <img src={Icons.FlagGrayIcon} alt='FlagGray' />} 
                            {priority.title === 'Medium' && <img src={Icons.FlagOrangeIcon} alt='FlagOrange' />} 
                            {priority.title === 'High' && <img src={Icons.FlagRedIcon} alt='FlagRed' />} 
                        </div>
                        {openSelectProgress && <Progress progressVariants={progressVariants} setProgress={setProgress}/>}
                        {openSelectPriority && <Prority priorityVariants={priorityVariants} setPriority={setPriority}/>}
                    </div>
                </div>
            </div>
            <div className={`taskBodyWrapper ${openedAnim ? 'openedAnim' : ''}`}>
                {opened && <OpenedTaskBody element={element} setTasks={setTasks} tasks={tasks} />}
            </div>

            <div className={`holderToshowDragged ${underlineAfterIndex === index && underlineAfterIndex !== prevIndex && (prevIndex < index || index == fatherArrayForTask.length-1) ? 'holderToshowDraggedShowed' : ''}`} />
        </div>
    )
}

export default Task
// import './task.scss'
// import dayjs from 'dayjs';
// import Icons from '../../utils/ThemeIconPicker'
// import OpenedTaskBody from './components/OpenedTaskBody/OpenedTaskBody';
// import Progress from '../dropdowns/Progress';
// import { Prority } from '../dropdowns/Prority';

// const Task = ({ 
//     element,
//     tasks,
//     setTasks,
//     updateTask,
//     handleDragStart,
//     handleDragOver,
//     handleDrop,
//     index,
//     underlineAfterIndex,
//     theme,
//     mousePos }) => {
    
//     const [active, setActive] = useState(element.active)
//     const [opened, setOpened] = useState(element.opened)
//     const [calendarActImg, setClandarActImg] = useState(Icons.calendarActiveIcon)
//     const [daysToPickedDate, setDaysToPickedDate] = useState(0)
//     const [progress, setProgress] = useState({title: element.other?.default?.progress})
//     const [priority, setPriority] = useState({title: element.other?.default?.priority})
//     const [currentTaskDragged, setCurrentTaskDragged] = useState(false)
//     const [currentTaskPos, setCurrentTaskPos] = useState(false)
//     // const [mousePos, setMousePos] = useState();

//     const progressVariants = [
//         {title: 'To Do', icon: Icons.ToDoIcon},
//         {title: 'On Testing', icon: Icons.OnTestingIcon},
//         {title: 'In Progress', icon: Icons.InProgressIcon},
//         {title: 'Done', icon: Icons.DoneIcon}
//     ]
//     const [openSelectProgress, setOpenSelectProgress] = useState(false)

//     //priority
//     const priorityVariants = [
//         {title: 'High', icon: Icons.FlagRedIcon},
//         {title: 'Medium', icon: Icons.FlagOrangeIcon},
//         {title: 'None', icon: Icons.FlagGrayIcon}
//     ]
//     const [openSelectPriority, setOpenSelectPriority] = useState(false)

//     let currentDate = dayjs(new Date())
//     let elementDate = dayjs(element?.date)

//     let taskref = useRef()


//     useEffect(() => {
//         setOpened(element.opened)
//         setActive(element.active)
//     }, [element, tasks])

//     const calendarImgFunc = () => {
//         if (currentDate?.$D === elementDate?.$D) {
//             setClandarActImg(Icons.todayIcon)
//         }else if (elementDate?.$D - currentDate?.$D === 1) {
//             setClandarActImg(Icons.tomorowIcon)
//         }else if (currentDate?.$M === elementDate?.$M && elementDate?.$D - currentDate?.$D) {
//             setClandarActImg(Icons.calendarActiveIcon)
//             setDaysToPickedDate(elementDate?.$D - currentDate?.$D)
//             // console.log(elementDate?.$D - currentDate?.$D);
//         }else{
//             setClandarActImg(Icons.calendarGrayIcon)
//         }
//     }

//     const handleOpenDropdowns = (setState, state) => {
//         if (opened) {
//             // console.log('====================================');
//             // console.log(handleOpenDropdowns);
//             // console.log('====================================');
//             setState(!state) 
//         }
//     }

//     // console.log('====================================');
//     // console.log(mousePos);
//     // console.log('====================================');

//     useEffect(() => {
//         calendarImgFunc()
//     }, [])

//     useEffect(() => {
//         setOpenSelectPriority(false)
//         setOpenSelectProgress(false)
//     }, [progress, priority]);
//     const onMouseDownHandler = (e) => {
//         console.log('====================================');
//         console.log(e);
//         setCurrentTaskDragged(true)
        
//         console.log('====================================');
//     }
//     const onMouseMoveHandler = (e) => {
//         setCurrentTaskPos(e.clientY)
        
//         console.log('====================================');
//     }

//     // useEffect(() => {

//     //     // ball.onmousedown = function(event) {
//     //     //     // (1) prepare to moving: make absolute and on top by z-index
//     //     //     ball.style.position = 'absolute';
//     //     //     ball.style.zIndex = 1000;
          
//     //     //     // move it out of any current parents directly into body
//     //     //     // to make it positioned relative to the body
//     //     //     document.body.append(ball);
          
//     //     //     // centers the ball at (pageX, pageY) coordinates
//     //     //     function moveAt(pageX, pageY) {
//     //     //       ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
//     //     //       ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
//     //     //     }
          
//     //     //     // move our absolutely positioned ball under the pointer
//     //     //     moveAt(event.pageX, event.pageY);
          
//     //     //     function onMouseMove(event) {
//     //     //       moveAt(event.pageX, event.pageY);
//     //     //     }
          
//     //     //     // (2) move the ball on mousemove
//     //     //     document.addEventListener('mousemove', onMouseMove);
          
//     //     //     // (3) drop the ball, remove unneeded handlers
//     //     //     ball.onmouseup = function() {
//     //     //       document.removeEventListener('mousemove', onMouseMove);
//     //     //       ball.onmouseup = null;
//     //     //     };
          
//     //     //   };
//     // }, [handleDrop])

//     const handleDrags = (e, index, value) => {
//         switch (value) {
//             case 'handleDragStart':
//                 handleDragStart(e, index)
//                 setCurrentTaskDragged(true)
//             break;
//             case 'handleDragOver':
//                 handleDragOver(e, index)
//                 setCurrentTaskDragged(false)
//             break;
//             case 'handleDrop':
//                 handleDrop(e, index)
//                 setCurrentTaskDragged(false)
//             break;
        
//             default:
//                 break;
//         }
//     }

//     return (
//     <>
//         {currentTaskDragged ?<div className={
//             opened ? `taskWrapper taskWrapperActive ${currentTaskDragged && ' taskDragged'}` 
//             : active ? `taskWrapper taskWrapperActive ${currentTaskDragged && ' taskDragged'}` 
//             : `taskWrapper notActiveTaskWrapper ${currentTaskDragged && ' taskDragged'}`      
//         }   
//             style={{ top: `${currentTaskPos}`}}
//             onClick={() => updateTask(element, 'active')}
//             onDoubleClick={() => updateTask(element, 'opened')}
//             // draggable
//             onMouseDown={(e) => onMouseDownHandler(e)}
//             onMouseMove={(e) => onMouseMoveHandler(e)}
//             // onDragStart={(e) => handleDrags(e, index, 'handleDragStart')}
//             // onDragOver={(e) => handleDragOver(e, index, 'handleDragOver')}
//             // onDrop={(e) => handleDrags(e, index, 'handleDrop')}
//         >
//              {underlineAfterIndex === index  && (
//                 <div className="holderToshowDragged"></div>
//             )}
//             <div className="taskTop">
//                 <div className="checkListItemsLeft">
//                     <img src={Icons.taskIcon} alt="" />
//                     <p>{element.title}</p>
//                     <div className="taskIcons">
//                         {element?.description?.length >= 1 && <img src={Icons.descriptonIcon} alt='descriptonIcon'/>}
//                         {element?.checkList?.length >= 1 && <img src={Icons.checkListIcon} alt='checkListIcon'/>} 
//                         {element?.labels?.length >= 1 && <img src={Icons.labelIcon} alt='labelIcon'/>}
//                     </div>
//                 </div>

//                 <div className="checkListItemsRight">
//                     <div className="checkListItemsRightPosible">
//                         {element.other?.posible?.repeat && <img src={Icons.repeatIcon} alt='repeatIcon'/>} 
//                         {element.other?.posible?.alarm && <img src={Icons.alarmIcon} alt='alarmIcon'/>}  
//                     </div>

//                     {currentDate?.$M === elementDate?.$M && elementDate?.$D - currentDate?.$D > 1 ?
//                         <div className="checkListItemsRightDate">
//                             <img src={calendarActImg} alt="" />
//                             <p>{daysToPickedDate}</p>
//                         </div> 
//                     : 
//                         <div className="checkListItemsRightDate">
//                             <img src={calendarActImg} alt=""/>
//                         </div> 
//                     }

//                     <div className="checkListItemsRightDefault">
//                         <div className="defaultImgWrapper"
//                             onClick={() => handleOpenDropdowns(setOpenSelectProgress, openSelectProgress)}
//                         >
//                             {progress.title === '' && <img src={Icons.ToDoIcon} alt='ToDo'/>} 
//                             {progress.title === 'To Do' && <img src={Icons.ToDoIcon} alt='ToDo'/>} 
//                             {progress.title === 'On Testing' && <img src={Icons.OnTestingIcon} alt='InProgress' />} 
//                             {progress.title === 'In Progress' && <img src={Icons.InProgressIcon} alt='OnTesting' />} 
//                             {progress.title === 'Done' && <img src={Icons.DoneIcon} alt='Done' />} 
//                         </div>

//                         <div className="defaultImgWrapper"
//                             onClick={() => handleOpenDropdowns(setOpenSelectPriority, openSelectPriority)}
//                         >
//                             {priority.title === '' && <img src={Icons.FlagGrayIcon} alt='ToDo'/>} 
//                             {priority.title === 'None' && <img src={Icons.FlagGrayIcon} alt='FlagGray' />} 
//                             {priority.title === 'Medium' && <img src={Icons.FlagOrangeIcon} alt='FlagOrange' />} 
//                             {priority.title === 'High' && <img src={Icons.FlagRedIcon} alt='FlagRed' />} 
//                         </div>
//                         {openSelectProgress && <Progress progressVariants={progressVariants} setProgress={setProgress}/>}
//                         {openSelectPriority && <Prority priorityVariants={priorityVariants} setPriority={setPriority}/>}
//                     </div>
//                 </div>

//             </div>
//             {opened && <OpenedTaskBody element={element} setTasks={setTasks} tasks={tasks} />}
//         </div> : <div className={
//             opened ? `taskWrapper taskWrapperActive ${currentTaskDragged && ' taskDragged'}` 
//             : active ? `taskWrapper taskWrapperActive ${currentTaskDragged && ' taskDragged'}` 
//             : `taskWrapper notActiveTaskWrapper ${currentTaskDragged && ' taskDragged'}`      
//         }   
//             style={{ top: mousePos}}
//             onClick={() => updateTask(element, 'active')}
//             onDoubleClick={() => updateTask(element, 'opened')}
//             draggable
//             onDragStart={(e) => handleDrags(e, index, 'handleDragStart')}
//             onDragOver={(e) => handleDragOver(e, index, 'handleDragOver')}
//             onDrop={(e) => handleDrags(e, index, 'handleDrop')}
//         >
//              {underlineAfterIndex === index  && (
//                 <div className="holderToshowDragged"></div>
//             )}
//             <div className="taskTop">
//                 <div className="checkListItemsLeft">
//                     <img src={Icons.taskIcon} alt="" />
//                     <p>{element.title}</p>
//                     <div className="taskIcons">
//                         {element?.description?.length >= 1 && <img src={Icons.descriptonIcon} alt='descriptonIcon'/>}
//                         {element?.checkList?.length >= 1 && <img src={Icons.checkListIcon} alt='checkListIcon'/>} 
//                         {element?.labels?.length >= 1 && <img src={Icons.labelIcon} alt='labelIcon'/>}
//                     </div>
//                 </div>

//                 <div className="checkListItemsRight">
//                     <div className="checkListItemsRightPosible">
//                         {element.other?.posible?.repeat && <img src={Icons.repeatIcon} alt='repeatIcon'/>} 
//                         {element.other?.posible?.alarm && <img src={Icons.alarmIcon} alt='alarmIcon'/>}  
//                     </div>

//                     {currentDate?.$M === elementDate?.$M && elementDate?.$D - currentDate?.$D > 1 ?
//                         <div className="checkListItemsRightDate">
//                             <img src={calendarActImg} alt="" />
//                             <p>{daysToPickedDate}</p>
//                         </div> 
//                     : 
//                         <div className="checkListItemsRightDate">
//                             <img src={calendarActImg} alt=""/>
//                         </div> 
//                     }

//                     <div className="checkListItemsRightDefault">
//                         <div className="defaultImgWrapper"
//                             onClick={() => handleOpenDropdowns(setOpenSelectProgress, openSelectProgress)}
//                         >
//                             {progress.title === '' && <img src={Icons.ToDoIcon} alt='ToDo'/>} 
//                             {progress.title === 'To Do' && <img src={Icons.ToDoIcon} alt='ToDo'/>} 
//                             {progress.title === 'On Testing' && <img src={Icons.OnTestingIcon} alt='InProgress' />} 
//                             {progress.title === 'In Progress' && <img src={Icons.InProgressIcon} alt='OnTesting' />} 
//                             {progress.title === 'Done' && <img src={Icons.DoneIcon} alt='Done' />} 
//                         </div>

//                         <div className="defaultImgWrapper"
//                             onClick={() => handleOpenDropdowns(setOpenSelectPriority, openSelectPriority)}
//                         >
//                             {priority.title === '' && <img src={Icons.FlagGrayIcon} alt='ToDo'/>} 
//                             {priority.title === 'None' && <img src={Icons.FlagGrayIcon} alt='FlagGray' />} 
//                             {priority.title === 'Medium' && <img src={Icons.FlagOrangeIcon} alt='FlagOrange' />} 
//                             {priority.title === 'High' && <img src={Icons.FlagRedIcon} alt='FlagRed' />} 
//                         </div>
//                         {openSelectProgress && <Progress progressVariants={progressVariants} setProgress={setProgress}/>}
//                         {openSelectPriority && <Prority priorityVariants={priorityVariants} setPriority={setPriority}/>}
//                     </div>
//                 </div>

//             </div>
//             {opened && <OpenedTaskBody element={element} setTasks={setTasks} tasks={tasks} />}
//         </div>}
//     </>

//     )
// }

// export default Task