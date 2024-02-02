import React, { useEffect, useRef, useState } from 'react'
import './addTask.scss'
import dayjs from 'dayjs';

//components
import DatePicker from '../dropdowns/datePicker/DatePicker.jsx'
import Icons from '../../utils/ThemeIconPicker.js'
import Progress from '../dropdowns/Progress.jsx';
import { Prority } from '../dropdowns/Prority.jsx';
import CheckListItem from './components/CheckListItem.jsx';

const AddTask = ({ setAddTaskOpen, setTasks, tasks }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [checkList, setCheckList] = useState([{title: '', done: false}])
    const [checkListItem, setCheckListItem] = useState('')
    const [repeat, setRepeat] = useState(false)
    const [alarm, setAlarm] = useState(false)

    const [labels, setLabels] = useState([])
    const [progress, setProgress] = useState('')
    const [priority, setPriority] = useState('')
    const [openSelectDate, setOpenSelectDate] = useState(false)
    const [Cdate, setDate] = useState(null);
    const [calendarImg, setClandarImg] = useState(Icons.calendarGrayIcon)
    const [daysToPickedDate, setDaysToPickedDate] = useState(0)
    const [shakeWindow, setShakeWindow] = useState()

    const [isEmptyTask, setIsEmptyTask] = useState(!title && !description && checkList.length == 1 && labels.length == 0 && !progress && !priority && Cdate == null)
    let currentDate = dayjs(new Date())

    //label
    const labelsVariants = ['label1','label2','label3','label4','label5']
    const [openSelectLabel, setOpenSelectLabel] = useState(false)

    //progress
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

    //refs
    const labelsRef = useRef(null);
    const progressRef = useRef(null);
    const priorityRef = useRef(null);
    const addTaskRef = useRef(null);
    const calendarRef = useRef(null);

    //get every click
    useOutsideAlerter(labelsRef, setOpenSelectLabel);
    useOutsideAlerter(progressRef, setOpenSelectProgress);
    useOutsideAlerter(priorityRef, setOpenSelectPriority);
    useOutsideAlerter(calendarRef, setOpenSelectDate);
    useOutsideAlerter(addTaskRef, setAddTaskOpen, 'mainWindow');


    const handleAddTask = () => {
        let newTask
        let updatedCheckList = []
        checkList.forEach((checklistEl) => {
            if (checklistEl.title.length !== 0) {
                console.log('====================================');
                console.log(checklistEl);
                console.log('====================================');
                updatedCheckList.push(checklistEl)
            }
        })

        if (title.length > 2) {
            newTask = {
                _id: `gdsgdfg${title}`,
                title,
                date: Cdate,
                inbox: true,
                labels,
                description,
                checkList: updatedCheckList,
                other: {
                  default:{
                    priority: priority.title ?  priority.title : '',
                    progress: progress.title ? progress.title : '',
                  },
                  posible:{
                    alarm,
                    repeat,
                  }
                }
            }
            setTasks([...tasks, newTask]) 
            setAddTaskOpen(false)  
        }
        
    }

    function useOutsideAlerter(ref, setState, reftype) {

        useEffect(() => {
            function handleClickOutside(event) {
                console.log(ref.current && !ref.current.contains(event.target));
                if (ref.current && !ref.current.contains(event.target)) {
                    if (reftype === 'mainWindow') {
                        if (!title && !description && checkList.length == 1 && labels.length == 0 && !progress && !priority && Cdate == null) {
                            setState(false)
                        }else if (title || description || checkList || checkListItem || labels || progress || priority || Cdate) {
                            setShakeWindow(true)
                            setTimeout(() => {
                                setShakeWindow(false)
                            }, 500);
                        }
                    }else{
                        setState(false)
                    }
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref, title, description ,checkList ,labels ,progress ,priority ,Cdate]);
    }

    

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setCheckList([...checkList, {title: '', done: false}])
        }
      };
    console.log(checkList);
    const pickLabel = (pickedLabel) => {
        if (labels.includes(pickedLabel)) {
            setLabels(labels.filter((label) => label !== pickedLabel))
        }else 
        // if(labels.length < 3)
        {
            setLabels([...labels, pickedLabel])
        }    
    }

    const calendarImgFunc = () => {
        if (currentDate?.$D === Cdate?.$D) {
            setClandarImg(Icons.todayIcon)
        }else if (Cdate?.$D - currentDate?.$D === 1) {
            setClandarImg(Icons.tomorowIcon)
        }else if (currentDate?.$M === Cdate?.$M && Cdate?.$D - currentDate?.$D) {
            setClandarImg(Icons.calendarActiveIcon)
            setDaysToPickedDate(Cdate?.$D - currentDate?.$D)
            // console.log(Cdate?.$D - currentDate?.$D);
        } else {
            setClandarImg(Icons.calendarGrayIcon)
        }
    }

    const setListItems = (el) => {
        let updatedList = checkList
        let updatedEl = updatedList[el]
        if (updatedList) {
            
        }
        setCheckList()
    }
    useEffect(() => {
        calendarImgFunc()
    }, [Cdate])

    useEffect(() => {
        setIsEmptyTask(!title && !description && checkList.length == 1 && labels.length == 0 && !progress && !priority && Cdate == null)
    }, [title, description, checkList, labels, progress, priority, Cdate])
    
    

    // calendarImg()


    return (
        <div className="addTaskDimBg">
            <div className={`AddTaskWrapper ${shakeWindow ? 'shakeWindow' : ''}`}
                ref={addTaskRef}
            >
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
                {checkList.map((el, index) => (
                        <CheckListItem 
                            el={el}
                            index={index} 
                            handleKeyDown={handleKeyDown} 
                            setCheckList={setCheckList}
                            checkList={checkList}
                        />
                ))}

                <div className="labels"
                    ref={labelsRef}
                >
                    <div className="labelInput">
                        {labels.length < 1 && <div className="labelWrapper labelBtnWrapper"
                            onClick={() => setOpenSelectLabel(true)}
                        >
                            <p>no label</p>
                        </div>}
                        {openSelectLabel && <div className="Select lableSelect">
                            {labelsVariants.map((label) => (
                                <div className="SelectUnit"
                                    onClick={() => pickLabel(label)}
                                >
                                    {labels.includes(label) ?  <img src={Icons.labelActiveIcon} alt="" /> : <img src={Icons.labelIcon} alt="" />}
                                    <p>{label}</p>
                                </div>  
                            ))}
                        </div>}
                    </div>
                    {labels.map((label) => (
                        <div className="labelWrapper"
                            onClick={() => setOpenSelectLabel(true)}
                        >
                            <p>{label}</p>
                        </div>
                    ))}

                </div>

                <div className="settings">
                    <div className="settingsLeft">
                        <img src={Icons.forwardTaskIcon} alt="" />
                        <p>Inbox</p>
                    </div>
                    <div className="settingsRight">
                        {Cdate && <div className="other">
                            <div className="otherDivs"
                                // onClick={() => setAlarm(!alarm)}
                            >
                                {alarm && <img src={Icons.alarmIcon} alt="" />}
                            </div>
                            {/*  */}
                            <div className="otherDivs"
                                // onClick={() => setRepeat(!repeat)}
                            >
                                {repeat && <img src={Icons.repeatIcon} alt="" />}
                            </div>
                        </div>}
                        <div className="calendarChoiceWrapper "
                            ref={calendarRef}
                        >
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
                                currentDate={currentDate}
                                Cdate={Cdate} 
                                setDate={setDate}
                                setOpenSelectDate={setOpenSelectDate}
                                alarm={alarm}
                                setAlarm={setAlarm}
                                repeat={repeat}
                                setRepeat={setRepeat}
                            />}
                        </div>
                        <div className="progressChoiceWrapper"
                            onClick={() => setOpenSelectProgress(!openSelectProgress)}
                            ref={progressRef}
                        >
                            {progress ? <img src={progress.icon} alt="" /> : <img src={Icons.ToDoIcon} alt="" />}
                            {openSelectProgress && <Progress 
                                progressVariants={progressVariants} 
                                setProgress={setProgress} 
                            />}
                        </div>

                        <div className="priorityChoiceWrapper"
                            onClick={() => setOpenSelectPriority(!openSelectPriority)}
                            ref={priorityRef}
                        >
                            {priority ? <img src={priority.icon} alt="" /> : <img src={Icons.FlagGrayIcon} alt="" />}
                            {openSelectPriority && 
                            <Prority 
                                priorityVariants={priorityVariants}
                                setPriority={setPriority}
                            />}
                        </div>
                    </div>
                </div>

                <div className="buttonsWrapper">
                    <p
                        onClick={() => setAddTaskOpen(false)}
                    >Cancel</p>
                    <div className={`btn ${isEmptyTask && 'disabled'}`}
                        onClick={() => handleAddTask()}
                    >
                        <p>Save</p>
                    </div>
                </div>

                <div className="closeBtn"
                    onClick={() => setAddTaskOpen(false)}
                >
                    <img src={Icons.closeBtnAddTask} alt="" />
                </div>
            </div>
        </div>
        
    )
}

export default AddTask