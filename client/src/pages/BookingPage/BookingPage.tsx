import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import BookingCalendarWrapper from '../../components/ManageBookings/BookingCalenderWrapper/BookingCalenderWrapper';
import BookingWrapper from '../../components/ManageBookings/BookingWrapper/BookingWrapper';
import CurrentBookingCard from '../../components/ManageBookings/CurrentBooking/CurrentBookingCard';
import { fetchAllRequest } from '../../helpers/APICalls/requests';
import { Request } from '../../interface/manageBooking';
import useStyles from './useStyles';
interface RequestObj {
  accepted: Request[];
  pending: Request[];
  cancelled: Request[];
}

const request: RequestObj = {
  accepted: [],
  pending: [],
  cancelled: [],
};

const BookingsPage = (): JSX.Element => {
  const [requests, setRequests] = useState(request);

  const classes = useStyles();

  useEffect(() => {
    const getAllAccepted = async () => {
      const result = await fetchAllRequest();
      setRequests(result.requests);
    };

    getAllAccepted();
  }, []);

  const accepted: Request[] = requests.accepted;
  const nextBookings: Request[] = requests.pending;
  const cancelled: Request[] = requests.cancelled;

  const nextBooking: Request = nextBookings.shift()!;

  return (
    <Grid container className={classes.wrapper}>
      <Grid xs={12} md={5} lg={5} item>
        <Box className={classes.boxMargin}>
          {nextBooking ? (
            <Box>
              <CurrentBookingCard
                start={nextBooking.start}
                name={nextBooking.user.name}
                photo={nextBooking.user.photo}
                _id={nextBooking._id}
                status={''}
              />
              <br />
              <BookingWrapper requests={accepted} cancelled={cancelled} />
            </Box>
          ) : (
            <Box>
              <Typography variant="h4" sx={{ textTransform: 'uppercase', marginLeft: '4em' }}>
                no new Bookings
              </Typography>
              <BookingWrapper requests={accepted} cancelled={cancelled} />
            </Box>
          )}
        </Box>
      </Grid>
      <Grid xs={10} md={5} lg={5} item>
        <Box className={classes.boxMargin}>
          <BookingCalendarWrapper nextBooking={nextBooking} bookingsArray={accepted} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default BookingsPage;
