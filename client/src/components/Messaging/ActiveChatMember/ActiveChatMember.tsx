import { Typography, Box } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { useStyles } from './useStyles';
import { Conversation } from '../../../interface/Messages';
import { createImageFromInitials } from '../../../helpers/makeAnImageFromName';

const ActiveChatMember = ({
  _id,
  receiverId,
  senderId,
  user: { name, photo, isOnline },
}: Conversation): JSX.Element => {
  const classes = useStyles();

  let image;
  if (!photo.length) image = createImageFromInitials(name);
  else image = photo;

  return (
    <Box className={classes.cardContainer}>
      <Box className={classes.image}>
        <img src={image} alt="Image" />
        {isOnline ? <Typography className={classes.online}></Typography> : ''}
      </Box>
      <Box className={classes.content}>
        <Typography sx={{ fontSize: '18px', fontWeight: 'bold', display: 'flex' }}>{name}</Typography>
      </Box>
      <Box className={classes.icon}>
        <MoreHorizIcon fontSize="large" />
      </Box>
    </Box>
  );
};

export default ActiveChatMember;
