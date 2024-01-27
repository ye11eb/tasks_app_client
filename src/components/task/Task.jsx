import React, { useEffect, useState } from 'react'
import './task.scss'
import dayjs from 'dayjs';

//Icons
import taskIcon from '../../media/taskIcon.svg'
import iconTask1 from '../../media/iconTask1.svg'
import CheckListItemsIcon from '../../media/CheckListItemsIcon.svg'

//Flag icons
import FlagRed from '../../media/flags/flagRed.svg'
import FlagGray from '../../media/flags/flagGray.svg'
import FlagOrange from '../../media/flags/flagOrange.svg'

//calendars icon
import todayIcon from '../../media/calendar/todayIcon.svg'
import tomorowIcon from '../../media/calendar/tomorowIcon.svg'
import calendarActiveIcon from '../../media/calendar/calendarIcon.svg'
import calendarGray from '../..//media/calendar/calendar.svg'

//Status icons
import ToDo from '../../media/progress/ToDo.svg'
import InProgress from '../../media/progress/InProgress.svg'
import OnTesting from '../../media/progress/OnTesting.svg'
import Done from '../../media/progress/Done.svg'

//Posible icons
import repeatIcon from '../../media/posible/repeat.svg'
import alarmIcon from '../../media/posible/alarmClock.svg'

import checkListIcon from '../../media/posible/checkListIcon.svg'
import labelIcon from '../../media/posible/labelIcon.svg'
import descriptonIcon from '../../media/posible/descriptonIcon.svg'
// import InProgress from '../../media/progress/InProgress.svg'
// import OnTesting from '../../media/progress/OnTesting.svg'
// import Done from '../../media/progress/Done.svg'


const Task = ({ element, tasks, updateTask, handleDragStart, handleDragOver, handleDrop, index, underlineAfterIndex }) => {
    const [active, setActive] = useState(element.active)
    const [opened, setOpened] = useState(element.opened)
    const [calendarImg, setClandarImg] = useState('')
    const [daysToPickedDate, setDaysToPickedDate] = useState(0)
    let currentDate = dayjs(new Date())
    let elementDate = dayjs(element?.date)
    console.log(elementDate);

    useEffect(() => {
        setOpened(element.opened)
        setActive(element.active)
    }, [element, tasks])

    const calendarImgFunc = () => {
        if (currentDate?.$D == elementDate?.$D) {
            setClandarImg(todayIcon)
        }else if (elementDate?.$D - currentDate?.$D === 1) {
            setClandarImg(tomorowIcon)
        }else if (currentDate?.$M === elementDate?.$M && elementDate?.$D - currentDate?.$D) {
            setClandarImg(calendarActiveIcon)
            setDaysToPickedDate(elementDate?.$D - currentDate?.$D)
            console.log(elementDate?.$D - currentDate?.$D);
        }
    }

    useEffect(() => {
        calendarImgFunc()
    }, [])

    return (
        <div className={
            opened ? `taskWrapper taskWrapperActive ${underlineAfterIndex && ' underlined'}` 
            : active ? `taskWrapper taskWrapperActive ${underlineAfterIndex && ' underlined'}` 
            : `taskWrapper notActiveTaskWrapper${underlineAfterIndex === index && ' underlined'}`   
        }
            onClick={() => updateTask(element, 'active')}
            onDoubleClick={() => updateTask(element, 'opened')}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
        >
            {underlineAfterIndex === index && <div className="underline" />}
            <div className="taskTop">
                <div className="checkListItemsLeft">
                    <img src={taskIcon} alt="" />
                    <p>{element.title}</p>
                    <div className="taskIcons">
                        {element?.description?.length >= 1 && <img src={descriptonIcon} alt='descriptonIcon'/>} 
                        {element?.checkList?.length >= 1 && <img src={checkListIcon} alt='checkListIcon'/>} 
                        {element?.labels?.length >= 1 && <img src={labelIcon} alt='labelIcon'/>}  
                    </div>
                </div>

                <div className="checkListItemsRight">
                    <div className="checkListItemsRightPosible">
                        {element.other?.posible?.repeat && <img src={repeatIcon} alt='repeatIcon'/>} 
                        {element.other?.posible?.alarm && <img src={alarmIcon} alt='alarmIcon'/>}  
                    </div>

                    {currentDate?.$M === elementDate?.$M && elementDate?.$D - currentDate?.$D > 1 ?
                        <div className="checkListItemsRightDate">
                            <img src={calendarImg} alt="" />
                            <p>{daysToPickedDate}</p>
                        </div> 
                    : 
                        <div className="checkListItemsRightDate">
                            <img src={calendarImg} alt=""/>
                        </div> 
                    }

                    <div className="checkListItemsRightDefault">
                        {element.other?.default?.progress === 'To Do' && <img src={ToDo} alt='ToDo'/>} 
                        {element.other?.default?.progress === 'On Testing' && <img src={InProgress} alt='InProgress' />} 
                        {element.other?.default?.progress === 'In Progress' && <img src={OnTesting} alt='OnTesting' />} 
                        {element.other?.default?.progress === 'Done' && <img src={Done} alt='Done' />} 

                        {element.other?.default?.priority === 'None' && <img src={FlagGray} alt='FlagGray' />} 
                        {element.other?.default?.priority === 'Medium' && <img src={FlagOrange} alt='FlagOrange' />} 
                        {element.other?.default?.priority === 'High' && <img src={FlagRed} alt='FlagRed' />} 
                    </div>
                </div>

            </div>
            {opened && 
                (
                    <div className="taskBody">
                        {element?.description && <p className="description">
                            {element?.description}
                        </p>}
                        {element?.checkList?.map((el) => (
                            <div className="checkListItemsWrapper">
                                <div className="checkListItem">
                                    <img src={CheckListItemsIcon} alt="" />
                                    <p>{el.title}</p>
                                </div>
                            </div>
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
        </div>
    )
}

export default Task