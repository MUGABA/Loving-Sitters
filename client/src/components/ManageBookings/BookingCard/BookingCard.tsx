import { Typography, Box, Avatar } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import useStyles from './useStyles';
import { createImageFromInitials } from '../../../helpers/makeAnImageFromName';
import { Bookings } from '../../../interface/ManageBooking';
import { convertDate } from '../../../helpers/APICalls/convertDateRightFormat';

const BookingCard = ({ name, start, status, photo }: Bookings): JSX.Element => {
  const letterImage = createImageFromInitials(name);

  let image: any;
  if (!photo.length) image = letterImage;
  else image = photo;

  const classes = useStyles();
  return (
    <Box component="div" className={classes.cardWrapper}>
      <SettingsIcon className={classes.icon} />
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
        <Typography
          component="span"
          className={classes.status}
          sx={{ fontSize: '20px', fontWeight: 'bold', paddingLeft: '20px' }}
        >
          {status}
        </Typography>
      </Box>
    </Box>
  );
};

export default BookingCard;
