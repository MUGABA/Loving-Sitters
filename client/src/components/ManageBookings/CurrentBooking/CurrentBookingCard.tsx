import { Typography, Box, Avatar } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import useStyles from './useStyles';
import { createImageFromInitials } from '../../../helpers/makeAnImageFromName';
import { Bookings } from '../../../interface/ManageBooking';
import ChangeRequestStatus from './ChangeRequestStatus';
import { useState } from 'react';
import { convertDate } from '../../../helpers/APICalls/convertDateRightFormat';

const CurrentBookingCard = ({ _id, name, start, photo, ...props }: Bookings): JSX.Element => {
  const [showAccept, setShowAccept] = useState(false);
  const classes = useStyles();

  const letterImage = createImageFromInitials(name);

  const firstName = name.split(' ')[0];
  const lastName = name.split(' ')[1];

  let image: any;
  if (!photo.length) image = letterImage;
  else image = photo;

  return (
    <>
      <Box>{showAccept ? <ChangeRequestStatus id={_id} /> : ''}</Box>
      <Box component="div" className={classes.cardWrapper}>
        <SettingsIcon
          className={classes.icon}
          onClick={() => {
            setShowAccept(!showAccept);
          }}
        />
        <Typography component="div" className={classes.title}>
          your current booking
        </Typography>
        <Typography variant="h6" className={classes.date}>
          {convertDate(start)}
        </Typography>
        <Box className={classes.details}>
          <Typography component="div" className={classes.image}>
            <Avatar alt={letterImage} src={image} />
          </Typography>
          <Typography className={classes.name} sx={{ fontSize: '18px', fontWeight: 'bold' }}>
            {name}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default CurrentBookingCard;
