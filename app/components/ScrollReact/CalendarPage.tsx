'use client'
import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';

const CalendarPage = () => {
  const [value, setValue] = useState(new Date());
  return (
    <section id="calendar">
      {/* Your About Me content here */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker orientation="portrait"     
       />
    </LocalizationProvider>
    </section>
  );
};

export default CalendarPage;