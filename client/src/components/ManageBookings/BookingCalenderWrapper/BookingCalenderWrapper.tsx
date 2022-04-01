import { Box } from '@mui/material';
import React from 'react';
import { Request } from '../../../interface/ManageBooking';
import BookingCalendar from '../BookingCalendar/BookingCalendar';

// return a filtered array AND remove filtered values from the original

interface calendar {
  nextBooking: Request;
  bookingsArray: Request[];
}

function BookingCalendarWrapper({ nextBooking, bookingsArray }: calendar): JSX.Element {
  function getPastBookings() {
    bookingsArray = bookingsArray.filter((value, index, arr) => {
      if (new Date(value.start) < new Date(Date.now())) {
        arr.splice(index, 1);
        return true;
      }
    });
    return bookingsArray;
  }

  function sortBookingDates() {
    return bookingsArray.sort((booking1, booking2) => {
      if (booking1.start < booking2.start) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  const pastBookings = getPastBookings();

  const sortedBookings = sortBookingDates();

  return (
    <Box sx={{ width: '100%' }}>
      <BookingCalendar firstBooking={nextBooking} upcomingBookings={sortedBookings} />
    </Box>
  );
}

export default BookingCalendarWrapper;
