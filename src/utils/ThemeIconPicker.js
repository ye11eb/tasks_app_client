import React from 'react'

//WhiteTheme
import dotsIconWhite from '../media/white/allTasksDots.svg'
import searchIconWhite from '../media/white/searchIcon.svg'
import allTasksIconWhite from '../media/white/pages/allTasksIcon.svg'
import byPriorityIconWhite from '../media/white/pages/byPriorityIcon.svg'
import HeaderPlussBtnWhite from '../media/white/HeaderPlussBtn.svg'

//calendars icon
import todayIconWhite from '../media/white/calendar/todayIcon.svg'
import todayGrayIconWhite from '../media/white/calendar/todayGrayIcon.svg'
import tomorowIconWhite from '../media/white/calendar/tomorowIcon.svg'
import tomorowGrayIconWhite from '../media/white/calendar/tomorowGrayIcon.svg'
import calendarActiveIconWhite from '../media/white/calendar/calendarActiveIcon.svg'
import calendarGrayIconWhite from '../media/white/calendar/calendarIcon.svg'

// import calendarActiveIconWhite from '../../media/calendar/calendarIcon.svg'

import taskIconWhite from '../media/white/taskIcon.svg'
//Posible icons
import repeatIconWhite from '../media/white/posible/repeat.svg'
import repeatIconGrayWhite from '../media/white/posible/repeatGray.svg'
import alarmIconWhite from '../media/white/posible/alarmClock.svg'
import alarmClockGrayWhite from '../media/white/posible/alarmClockGray.svg'
import checkListIconWhite from '../media/white/posible/checkListIcon.svg'
import checkListActiveCircleIconWhite from '../media/white/posible/checkListActiveCircleIcon.svg'
import labelActiveIconWhite from '../media/white/posible/labelActiveIcon.svg'
import labelIconWhite from '../media/white/posible/labelIcon.svg'
import descriptonIconWhite from '../media/white/posible/descriptonIcon.svg'
import checkListCircleIconWhite from '../media/white/posible/checkListCircleIcon.svg'
//progress
import DoneIconWhite from '../media/white/progress/Done.svg'
import InProgressIconWhite from '../media/white/progress/InProgress.svg'
import OnTestingIconWhite from '../media/white/progress/OnTesting.svg'
import ToDoIconWhite from '../media/white/progress/ToDo.svg'

//flags
import FlagRedIconWhite from '../media/white/flags/flagRed.svg'
import FlagOrangeIconWhite from '../media/white/flags/flagOrange.svg'
import FlagGrayIconWhite from '../media/white/flags/flagGray.svg'

//addTask 
import closeBtnAddTaskWhite from '../media/white/closeBtnAddTask.svg'
import forwardTaskIconWhite from '../media/white/posible/forwardTaskIcon.svg'


//BlackTheme
//title
import allTasksIconBlack from '../media/darkMode/pages/allTasksIcon.svg'
import searchIconBlack from '../media/darkMode/searchIconDark.svg'
import dotsIconBlack from '../media/darkMode/headerDots.svg'
import byPriorityIconBlack from '../media/darkMode/pages/byPriorityIcon.svg'
import HeaderPlussBtnBlack from '../media/darkMode/HeaderPlussBtn.svg'
import circleCalendarWhite from '../media/white/calendar/circleCalendar.svg'

//task 

//calendars
import todayIconBlack from '../media/darkMode/calendar/todayIcon.svg'
import todayGrayIconBlack from '../media/darkMode/calendar/todayGrayIcon.svg'
import tomorowIconBlack from '../media/darkMode/calendar/tomorowIcon.svg'
import tomorowGrayIconBlack from '../media/darkMode/calendar/tomorowGrayIcon.svg'
import calendarActiveIconBlack from '../media/darkMode/calendar/calendarActiveIcon.svg'
import calendarGrayIconBlack from '../media/darkMode/calendar/calendarIcon.svg'


import taskIconBlack from '../media/darkMode/taskIcon.svg'
//Posible icons
import repeatIconBlack from '../media/darkMode/posible/repeat.svg'
import repeatIconGrayBlack from '../media/darkMode/posible/repeatGray.svg'
import alarmIconBlack from '../media/darkMode/posible/alarmClock.svg'
import alarmClockGrayBlack from '../media/darkMode/posible/alarmClockGray.svg'
import descriptonIconBlack from '../media/darkMode/posible/descriptonIcon.svg'
import checkListIconBlack from '../media/darkMode/posible/checkListIcon.svg'
import checkListActiveCircleIconBlack from '../media/darkMode/posible/checkListActiveCircleIcon.svg'
import labelIconBlack from '../media/darkMode/posible/labelIcon.svg'
import labelActiveIconBlack from '../media/darkMode/posible/labelActiveIcon.svg'
import ToDoIconBlack from '../media/darkMode/ToDo.svg'
import FlagGrayIconBlack from '../media/darkMode/flagGray.svg'
import checkListCircleIconBlack from '../media/darkMode/posible/checkListCircleIcon.svg'

//addTask
import forwardTaskIconBlack from '../media/darkMode/posible/forwardTaskIcon.svg'
import closeBtnAddTaskBlack from '../media/darkMode/closeBtnAddTask.svg'
import circleCalendarBlack from '../media/darkMode/calendar/circleCalendar.svg'


const theme = window.matchMedia("(prefers-color-scheme: dark)").matches

const icons = {
    //header
    dotsIcon: theme ? dotsIconBlack : dotsIconWhite,
    allTasksIcon: theme ? allTasksIconBlack : allTasksIconWhite,
    byPriorityIcon: theme ? byPriorityIconBlack : byPriorityIconWhite,
    searchIcon: theme ? searchIconBlack : searchIconWhite,
    HeaderPlussBtn: theme ? HeaderPlussBtnBlack : HeaderPlussBtnWhite,

    // task

    //time
    todayIcon: theme ? todayIconBlack : todayIconWhite,
    todayGrayIcon: theme ? todayGrayIconBlack : todayGrayIconWhite,
    tomorowIcon: theme ? tomorowIconBlack : tomorowIconWhite,
    tomorowGrayIcon: theme ? tomorowGrayIconBlack : tomorowGrayIconWhite,
    calendarActiveIcon: theme ? calendarActiveIconBlack : calendarActiveIconWhite,
    calendarGrayIcon: theme ? calendarGrayIconBlack : calendarGrayIconWhite,

    //posible
    repeatIcon: theme ? repeatIconBlack : repeatIconWhite,
    repeatGrayIcon: theme ? repeatIconGrayBlack : repeatIconGrayWhite,
    alarmIcon: theme ? alarmIconBlack : alarmIconWhite,
    alarmGrayIcon: theme ? alarmClockGrayBlack : alarmClockGrayWhite,
    descriptonIcon: theme ? descriptonIconBlack : descriptonIconWhite,
    checkListIcon: theme ? checkListIconBlack : checkListIconWhite,
    labelIcon: theme ? labelIconBlack : labelIconWhite,
    labelActiveIcon: theme ? labelActiveIconBlack : labelActiveIconWhite,
    taskIcon: theme ? taskIconBlack : taskIconWhite,
    checkListCircleIcon: theme ?  checkListCircleIconBlack : checkListCircleIconWhite,
    checkListActiveCircleIcon: theme ?  checkListActiveCircleIconBlack : checkListActiveCircleIconWhite,
    forwardTaskIcon: theme ? forwardTaskIconBlack : forwardTaskIconWhite,
    //progress
    DoneIcon: DoneIconWhite,
    InProgressIcon: InProgressIconWhite,
    OnTestingIcon: OnTestingIconWhite,
    ToDoIcon: theme ? ToDoIconBlack : ToDoIconWhite,

    //flags 
    FlagRedIcon: FlagRedIconWhite,
    FlagOrangeIcon: FlagOrangeIconWhite,
    FlagGrayIcon: theme ? FlagGrayIconBlack : FlagGrayIconWhite,

    //other 
    closeBtnAddTask: theme ? closeBtnAddTaskBlack : closeBtnAddTaskWhite,
    circleCalendar: theme ? circleCalendarBlack : circleCalendarWhite,
}

export default icons