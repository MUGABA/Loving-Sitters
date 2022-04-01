import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import CurrentBookingCard from '../CurrentBooking/CurrentBookingCard';
import BookingCard from '../BookingCard/BookingCard';
import useStyles from './useStyles';
import { RequestsList } from '../../../interface/ManageBooking';

const BookingWrapper = ({ requests, cancelled }: RequestsList): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.contentWrapper}>
        <Typography className={classes.sectionHeader}>current Bookings</Typography>
        {requests.map((item) => (
          <BookingCard
            name={item.user.name}
            start={item.start}
            status={item.status}
            photo={item.user.photo}
            key={item._id}
            _id={item._id}
          />
        ))}
        <Typography className={classes.sectionHeader}>past Bookings</Typography>
        {cancelled.map((item, i) => (
          <BookingCard
            name={item.user.name}
            start={item.start}
            status={item.status}
            photo={item.user.photo}
            key={item._id}
            _id={item._id}
          />
        ))}
      </Box>
    </Box>
  );
};

export default BookingWrapper;
