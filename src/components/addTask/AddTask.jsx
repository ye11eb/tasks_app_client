import React, { useEffect, useRef, useState } from 'react'
import './addTask.scss'
import dayjs from 'dayjs';

//components
import DatePicker from '../datePicker/DatePicker'

//icons 
import checkListIcon from '../../media/checkListIcon.svg'
import closeBtnAddTask from '../../media/closeBtnAddTask.svg'
import circleChecklist from '../../media/circleChecklist.svg'
import labelIcon from '../../media/posible/labelIcon.svg'
import labelActiveIcon from '../../media/posible/labelActiveIcon.svg'
import forwardTaskImg from '../../media/forwardTaskImg.svg'
import repeatGrayIcon from '../../media/posible/repeat.svg'
import alarmClockGrayIcon from '../../media/posible/alarmClock.svg'
import repeatIcon from '../../media/posible/repeatGray.svg'
import alarmClockIcon from '../../media/posible/alarmClockGray.svg'

// import calendar from 'client/src/media/posible/calendar.svg'
//calendars icon
import todayIcon from '../../media/calendar/todayIcon.svg'
import tomorowIcon from '../../media/calendar/tomorowIcon.svg'
import calendarActiveIcon from '../../media/calendar/calendarIcon.svg'
import calendarGray from '../../media/calendar/calendar.svg'

//flags
import flagGray from '../../media/flags/flagGray.svg'
import flagOrange from '../../media/flags/flagOrange.svg'
import flagRed from '../../media/flags/flagRed.svg'

//progress
import Done from '../../media/progress/Done.svg'
import InProgress from '../../media/progress/InProgress.svg'
import OnTesting from '../../media/progress/OnTesting.svg'
import ToDo from '../../media/progress/ToDo.svg'

const AddTask = ({ setAddTaskOpen, setTasks, tasks }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [checkList, setCheckList] = useState([])
    const [checkListItem, setCheckListItem] = useState('')
    const [repeat, setRepeat] = useState(false)
    const [alarm, setAlarm] = useState(true)

    const [labels, setLabels] = useState([])
    const [progress, setProgress] = useState('')
    const [priority, setPriority] = useState('')
    const [openSelectDate, setOpenSelectDate] = useState(false)
    const [Cdate, setDate] = useState(null);
    const [calendarImg, setClandarImg] = useState(calendarGray)
    const [daysToPickedDate, setDaysToPickedDate] = useState(0)
    let currentDate = dayjs(new Date())

    //label
    const labelsVariants = ['label1','label2','label3','label4','label5']
    const [openSelectLabel, setOpenSelectLabel] = useState(false)

    //progress
    const progressVariants = [
        {title: 'To Do', icon: ToDo},
        {title: 'On Testing', icon: OnTesting},
        {title: 'In Progress', icon: InProgress},
        {title: 'Done', icon: Done}
    ]
    const [openSelectProgress, setOpenSelectProgress] = useState(false)

    //priority
    const priorityVariants = [
        {title: 'High', icon: flagRed},
        {title: 'Medium', icon: flagOrange},
        {title: 'None', icon: flagGray}
    ]
    const [openSelectPriority, setOpenSelectPriority] = useState(false)

    //

    //refs
    const labelsRef = useRef(null);
    const progressRef = useRef(null);
    const priorityRef = useRef(null);
    const calendarRef = useRef(null);

    //get every click
    useOutsideAlerter(labelsRef, setOpenSelectLabel);
    useOutsideAlerter(calendarRef, setOpenSelectDate);
    useOutsideAlerter(progressRef, setOpenSelectProgress);
    useOutsideAlerter(priorityRef, setOpenSelectPriority);

    console.log(progress);

    const handleAddTask = () => {
        let newTask = {
            _id: `gdsgdfg${title}`,
            title,
            date: Cdate,
            inbox: true,
            labels,
            description,
            checkList,
            other: {
              default:{
                priority: priority.title,
                progress: progress.title,
              },
              posible:{
                alarm,
                repeat,
              }
            }
        }
        setTasks([...tasks, newTask])
    }


    function useOutsideAlerter(ref, setState) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setState(false)
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setCheckList([...checkList, {title: checkListItem, done: false}])
            setCheckListItem('')
        }
      };

    const pickLabel = (pickedLabel) => {
        console.log(pickedLabel);
        console.log(labels);
        if (labels.includes(pickedLabel)) {
            setLabels(labels.filter((label) => label !== pickedLabel))
        }else if(labels.length < 3){
            setLabels([...labels, pickedLabel])
        }    
    }

    const calendarImgFunc = () => {
        if (currentDate?.$D == Cdate?.$D) {
            setClandarImg(todayIcon)
        }else if (Cdate?.$D - currentDate?.$D === 1) {
            setClandarImg(tomorowIcon)
        }else if (currentDate?.$M === Cdate?.$M && Cdate?.$D - currentDate?.$D) {
            setClandarImg(calendarActiveIcon)
            setDaysToPickedDate(Cdate?.$D - currentDate?.$D)
            console.log(Cdate?.$D - currentDate?.$D);
        }
    }

    useEffect(() => {
        calendarImgFunc()
    }, [Cdate])
    

    // calendarImg()


    return (
        <div className='AddTaskWrapper'>
            <input 
                autoFocus 
                type="text" 
                placeholder='Task title'
                className='AddTaskTitleInput'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            
            <div className="inputWrapper">
                <input 
                    type="text" 
                    placeholder='Description'
                    className='AddTaskInput'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            {checkList.map((el) => (
                <div className="ckeckListItem">
                    <img src={circleChecklist} alt="" />
                    <p>{el.title}</p>
                </div>
            ))}
            <div className="inputWrapper">
                <img src={checkListIcon} alt="" />
                <input 
                    type="text" 
                    placeholder='Checklist'
                    className='AddTaskInput'
                    value={checkListItem}
                    onChange={(e) => setCheckListItem(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            <div className="labels">
                <div className="labelInput"
                    onClick={() => setOpenSelectLabel(true)}
                    ref={labelsRef}
                >
                    <div className="labelWrapper labelBtnWrapper">
                        <p>no label</p>
                    </div>
                    {openSelectLabel && <div className="Select">
                        {labelsVariants.map((label) => (
                            <div className="SelectUnit"
                                onClick={() => pickLabel(label)}
                            >
                                {labels.includes(label) ?  <img src={labelActiveIcon} alt="" /> : <img src={labelIcon} alt="" />}
                                <p>{label}</p>
                            </div>  
                        ))}
                    </div>}
                </div>
                {labels.map((label) => (
                    <div className="labelWrapper">
                        <p>{label}</p>
                    </div>
                ))}

            </div>

            <div className="settings">
                <div className="settingsLeft">
                    <img src={forwardTaskImg} alt="" />
                    <p>Inbox</p>
                </div>
                <div className="settingsRight">
                    <div className="other">
                        <div className="otherDivs"
                            onClick={() => setAlarm(!alarm)}
                        >
                            <img src={alarm ? alarmClockGrayIcon : alarmClockIcon} alt="" />
                        </div>
                        {/*  */}
                        <div className="otherDivs"
                            onClick={() => setRepeat(!repeat)}
                        >
                            <img src={repeat ? repeatGrayIcon : repeatIcon} alt="" />
                        </div>
                    </div>
                    <div className="calendarChoiceWrapper">
                        {currentDate?.$M === Cdate?.$M && Cdate?.$D - currentDate?.$D > 1 ?
                            <div className="imgIconWrapper">
                                <img src={calendarImg} alt="" 
                                    onClick={() => setOpenSelectDate(!openSelectDate)}
                                />
                                <p>{daysToPickedDate}</p>
                            </div> 
                        : 
                            <div className="imgIconWrapper">
                                <img src={calendarImg} alt="" 
                                    onClick={() => setOpenSelectDate(!openSelectDate)}
                                />
                            </div> 
                        }
                        {openSelectDate && <DatePicker
                            calendarRef={calendarRef}
                            Cdate={Cdate} 
                            setDate={setDate}
                            setOpenSelectDate={setOpenSelectDate}
                        />}
                    </div>
                    <div className="progressChoiceWrapper"
                        onClick={() => setOpenSelectProgress(true)}
                        ref={progressRef}
                    >
                        {progress ? <img src={progress.icon} alt="" /> : <img src={ToDo} alt="" />}
                        {openSelectProgress && 
                        <div className="Select selectProgress">
                            {progressVariants.map((Item) => (
                                <div className="SelectUnit"
                                    onClick={() => setProgress(Item)}
                                >
                                    <img src={Item.icon} alt="" />
                                    <p>{Item.title}</p>
                                </div>  
                            ))}
                        </div>}
                    </div>

                    <div className="priorityChoiceWrapper"
                        onClick={() => setOpenSelectPriority(true)}
                        ref={priorityRef}
                    >
                        {priority ? <img src={priority.icon} alt="" /> : <img src={flagGray} alt="" />}
                        {openSelectPriority && 
                        <div className="Select selectProgress">
                            {priorityVariants.map((Item) => (
                                <div className="SelectUnit"
                                    onClick={() => setPriority(Item)}
                                >
                                    <img src={Item.icon} alt="" />
                                    <p>{Item.title}</p>
                                </div>  
                            ))}
                        </div>}
                    </div>
                </div>
            </div>

            <div className="buttonsWrapper">
                <p
                    onClick={() => setAddTaskOpen(false)}
                >Cancel</p>
                <div className="btn"
                    onClick={() => handleAddTask()}
                >
                    <p>Save</p>
                </div>
            </div>

            <div className="closeBtn"
                onClick={() => setAddTaskOpen(false)}
            >
                <img src={closeBtnAddTask} alt="" />
            </div>
        </div>
    )
}

export default AddTask