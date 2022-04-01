import Box from '@mui/material/Box';
import { isSameDay } from 'date-fns';
import Calendar from 'react-calendar';
import useStyles from './useStyles';
import { Request } from '../../../interface/ManageBooking';

export interface Booking {
  startTime: Date;
  endTime: Date;
  status: string;
}

interface Props {
  firstBooking?: Request;
  upcomingBookings?: Request[];
}

function BookingCalendar({ firstBooking, upcomingBookings }: Props): JSX.Element {
  const classes = useStyles();

  function tileClassName({ date, view }: { date: Date; view: string }) {
    if (view === 'month') {
      if (firstBooking) {
        if (isSameDay(date, new Date(firstBooking.start))) {
          return classes.activeTile;
        }
        if (upcomingBookings) {
          for (const booking of upcomingBookings) {
            if (isSameDay(new Date(booking.start), date) && booking.status != 'CANCELLED') {
              return classes.activeTile;
            }
          }
        }
      }
    }
    return 'yes';
  }

  return (
    <Box>
      <Calendar className={classes.calendar} tileClassName={tileClassName} />
    </Box>
  );
}
export default BookingCalendar;
