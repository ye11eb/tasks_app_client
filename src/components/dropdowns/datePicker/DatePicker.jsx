import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import updateLocale from 'dayjs/plugin/updateLocale';
import './datePicker.scss';
import { TextField } from '@mui/material';

import Icons from '../../../utils/ThemeIconPicker.js'

// icons

const DatePicker = ({
  currentDate, 
  Cdate, 
  setDate, 
  setOpenSelectDate,
  alarm,
  setAlarm,
  repeat,
  setRepeat}) => {
  dayjs.extend(updateLocale);
  dayjs.updateLocale('en', {
    weekStart: 1,
  });

  const checkIsPickedDate = (setState, state) => {
    if (Cdate?.$D) {

      setState(!state)
    }
  }  
  return (
    <div className="calendarWrapper calendarSelect">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer className="DemoContainer" components={['DateCalendar', 'DateCalendar', 'DateCalendar']}>
          <div className="muiDatePickerCustomStyles">
            <DemoItem>
            
              <DateCalendar
                defaultValue={dayjs(Date.now())}
                views={['year', 'month', 'day']}
                dayOfWeekFormatter={(_day, weekday) => `${weekday.format('dd')}`}
                // className=''
                slots={{
                  OpenPickerIcon: Icons.circleCalendar,
                }}
                value={Cdate}
                onChange={(newValue) => setDate(newValue)}
                showDaysOutsideCurrentMonth={true}
                renderInput={(params) => <TextField {...params} />}
              />
            
            </DemoItem>
          </div>
        </DemoContainer>
      </LocalizationProvider>
      <div className="customButtons">
        <div className="iconsbtn">
            <div className="otherDivs"
              onClick={() => checkIsPickedDate(setAlarm, alarm)}
            >
                <img src={alarm ? Icons.alarmIcon : Icons.alarmGrayIcon} alt="" />
            </div>
            <div className="otherDivs"
              onClick={() => checkIsPickedDate(setRepeat, repeat)}
            >
                <img src={repeat ? Icons.repeatIcon: Icons.repeatGrayIcon} alt="" />
            </div>
          {currentDate?.$M === Cdate?.$M && Cdate?.$D === currentDate?.$D ?  
            (<img src={Icons.todayIcon} alt="" 
              onClick={() => setDate(dayjs(Date.now()))}
            />)
            :
            (<img src={Icons.todayGrayIcon} alt="" 
              onClick={() => setDate(dayjs(Date.now()))}
            />)
          }
          {currentDate?.$M === Cdate?.$M && Cdate?.$D - currentDate?.$D === 1 ?  
            (<img src={Icons.tomorowIcon} alt="" 
              onClick={() => setDate(dayjs().add(1, 'day'))}
            />)
            :
            (<img src={Icons.tomorowGrayIcon} alt="" 
              onClick={() => setDate(dayjs().add(1, 'day'))}
            />)
          }
        </div>
        <div className="buttons">
          <div className="btn"
            onClick={() => {
                // setOpenSelectDate(false)
                setDate(null)
            }}
          >
            <p>Clear</p>
          </div>
          <div className="btn filled"
            onClick={() => setOpenSelectDate(false)}
          >
            <p>OK</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
