import { useAuth } from '../../../context/useAuthContext';
import { createImageFromInitials } from '../../../helpers/makeAnImageFromName';
import { TextMessage } from '../../../interface/messages';
import { Box, Typography } from '@mui/material';
import { useStyles } from './useStyles';

const ChatMessage = ({ senderId, message, photo, name }: TextMessage): JSX.Element => {
  const { profile } = useAuth();
  const classes = useStyles();
  const messageClass = senderId === profile._id ? classes.sent : classes.received;

  let image;
  if (photo.length) image = photo;
  else image = createImageFromInitials(name);

  const textStyle = messageClass.split('-')[1] === 'sent' ? classes.textSent : classes.textRecieved;

  return (
    <>
      <Box className={`message ${messageClass}`}>
        <img src={image} alt="image" />
        <Typography className={textStyle} sx={{ fontSize: '15px', fontWeight: 'bold' }}>
          {message}
        </Typography>
      </Box>
    </>
  );
};

export default ChatMessage;
