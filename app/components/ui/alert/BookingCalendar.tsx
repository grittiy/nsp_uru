'use client'
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { Typography, Paper } from '@mui/material';
import thLocale from 'date-fns/locale/th';

// Define the type for a booking
interface Booking {
  id: number;
  name: string;
  date: string;
}

interface BookingCalendarProps {
  bookings: Booking[];
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ bookings }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: Date | Date[] | null) => {
  setSelectedDate(date && Array.isArray(date) ? date[0] : date || new Date());
};

  const getBookingsForDate = (date: Date) => {
    const formattedDate = format(date, 'MMMM yyyy', { locale: thLocale });
    return bookings && Array.isArray(bookings)
      ? bookings.filter((booking) => booking.date === formattedDate)
      : [];
  };

  return (
    <Paper style={{ padding: '16px', marginTop: '16px' }}>
      <Typography variant="h6" gutterBottom>
        ปฏิทินการจอง
      </Typography>
      <Calendar
        // onChange={handleDateChange}
        value={selectedDate}
      />
      <Typography variant="subtitle1" gutterBottom style={{ marginTop: '16px' }}>
        ข้อมูลการจองวันที่ {format(selectedDate, 'dd/MM/yyyy')}
      </Typography>
      <ul>
        {getBookingsForDate(selectedDate).map((booking) => (
          <div key={booking.id}>{booking.name}</div>
        ))}
      </ul>
    </Paper>
  );
};

export default BookingCalendar;
