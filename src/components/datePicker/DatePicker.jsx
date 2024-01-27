import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import updateLocale from 'dayjs/plugin/updateLocale';
import circleCalendar from '../../media/circleCalendar.svg';
import './datePicker.scss';
import { TextField } from '@mui/material';

// icons
import tomorowIcon from './icons/tomorowIcon.svg';
import todayIcon from './icons/todayIcon.svg';

const DatePicker = ({ Cdate, setDate, setOpenSelectDate, calendarRef }) => {
  dayjs.extend(updateLocale);
  dayjs.updateLocale('en', {
    weekStart: 1,
  });
  
  return (
    <div className="calendarWrapper"
        ref={calendarRef}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer className="DemoContainer" components={['DateCalendar', 'DateCalendar', 'DateCalendar']}>
          <DemoItem>
            <DateCalendar
              defaultValue={dayjs(Date.now())}
              views={['year', 'month', 'day']}
              dayOfWeekFormatter={(_day, weekday) => `${weekday.format('dd')}`}
              slots={{
                OpenPickerIcon: circleCalendar,
              }}
              value={Cdate}
              onChange={(newValue) => setDate(newValue)}
              showDaysOutsideCurrentMonth={true}
              renderInput={(params) => <TextField {...params} />}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
      <div className="customButtons">
        <div className="iconsbtn">
          <img src={todayIcon} alt="" 
            onClick={() => setDate(dayjs(Date.now()))}
          />
          <img src={tomorowIcon} alt="" 
            onClick={() => setDate(dayjs().add(1, 'day'))}
          />
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
