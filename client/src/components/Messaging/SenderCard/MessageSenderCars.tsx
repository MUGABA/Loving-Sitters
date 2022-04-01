import { Typography, Box } from '@mui/material';
import { visitNodes } from 'typescript';
import { createImageFromInitials } from '../../../helpers/makeAnImageFromName';
import { Conversation } from '../../../interface/Messages';

import { useStyles } from './useStyles';

interface sender {
  senderInfo: Conversation;
  handleConversationChange: (id?: string) => void;
}

const date = (date: string) => {
  return new Date(date).toLocaleString().slice(0, 9);
};

const MessageSenderCard = ({ senderInfo, handleConversationChange }: sender): JSX.Element => {
  const {
    _id,
    receiverId,
    senderId,
    user: { name, photo, isOnline },
    message: { message, createdAt },
  } = senderInfo;
  const classes = useStyles();

  let image;
  if (!photo.length) image = createImageFromInitials(name);
  else image = photo;

  const lastMessageTime = date(createdAt);
  const lastMessage = message.slice(0, 25);

  return (
    <Box
      className={classes.cardContainer}
      onClick={() => {
        handleConversationChange(_id);
      }}
    >
      <Box className={classes.image}>
        <img src={image} alt="Image" />
        {isOnline ? <Typography className={classes.online}></Typography> : ''}
      </Box>
      <Box className={classes.content}>
        <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>{name}</Typography>
        <Typography className="message" sx={{ fontSize: '13px' }}>
          {lastMessage}...
        </Typography>
      </Box>
      <Box className={classes.sentTime}>
        <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>{lastMessageTime}</Typography>
      </Box>
    </Box>
  );
};

export default MessageSenderCard;
