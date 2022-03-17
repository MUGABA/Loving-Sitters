import { Typography, Box, Paper } from '@mui/material';
import { Conversation, Conversations } from '../../../interface/messages';
import MessageSenderCard from '../SenderCard/MessageSenderCars';
import { useStyles } from './useStyles';

interface sideWrapper {
  conversations: Conversation[];
  handleConversationChange: () => void;
}

const SendersSideWrapper = ({ conversations, handleConversationChange }: sideWrapper): JSX.Element => {
  const classes = useStyles();

  return (
    <Box elevation={3} component={Paper} square className={classes.wrapper}>
      <Box className={classes.header}>
        <Typography sx={{ fontSize: '18px', fontWeight: 'bold', margin: 'auto 10px' }}>Inbox Messages</Typography>
      </Box>
      <Box className={classes.chats}>
        {conversations.map((item, i) => (
          <MessageSenderCard key={item._id} senderInfo={item} handleConversationChange={handleConversationChange} />
        ))}
      </Box>
    </Box>
  );
};

export default SendersSideWrapper;
