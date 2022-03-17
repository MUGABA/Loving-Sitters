import { Box, Button, TextField } from '@mui/material';
import ActiveChatMember from '../ActiveChatMember/ActiveChatMember';
import ChatMessage from '../Message/ChartMessage';
import { useEffect, useState, useRef } from 'react';
import { useStyles } from './useStyles';
import { ChatRoomI, Message } from '../../../interface/messages';
import { getAllMessages, sendMessage } from '../../../helpers/APICalls/messaging';
import { useAuth } from '../../../context/useAuthContext';

const ChatRoom = ({ conversation }: ChatRoomI): JSX.Element => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const { profile } = useAuth();
  const messagesEndRef = useRef<HTMLInputElement>(null);

  const classes = useStyles();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      const result = await getAllMessages(conversation._id);

      setMessages(result.success.messages);
    };

    fetchMessages();
  }, [conversation]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let receiverId: string;
    const sender = conversation.senderId;
    const receiver = conversation.receiverId;

    if (profile._id === sender) {
      receiverId = receiver;
    } else {
      receiverId = sender;
    }

    const messageObj: Message = {
      receiverId,
      senderId: profile._id,
      message,
      _id: '',
      createdAt: '',
      user: {
        name: '',
        photo: '',
        isOnline: false,
      },
    };

    setMessages([...messages, messageObj]);

    const sendMessageToServer = async () => {
      try {
        await sendMessage(receiverId, message);
      } catch (error) {
        const newMessages = messages.filter((messa) => messa.message !== messageObj.message);

        setMessages(newMessages);
      }
    };
    sendMessageToServer();

    setMessage('');
  };

  return (
    <Box>
      <ActiveChatMember
        _id={conversation._id}
        receiverId={conversation.receiverId}
        senderId={conversation.senderId}
        user={{
          name: conversation.user.name,
          photo: conversation.user.photo,
          isOnline: conversation.user.isOnline,
        }}
        message={{
          message: '',
          createdAt: '',
        }}
      />
      <Box className={classes.chatRoom}>
        {messages &&
          messages.map((message, i) => (
            <ChatMessage
              key={i}
              senderId={message.senderId}
              message={message.message}
              photo={message.user.photo}
              name={message.user.name}
            />
          ))}
        <Box ref={messagesEndRef} />
      </Box>

      <form onSubmit={handleSubmit} className={classes.form}>
        <Box className={classes.input}>
          <TextField
            type="text"
            label={`reply to ${conversation.user.name}`}
            variant="standard"
            value={message}
            className={classes.text}
            InputProps={{
              disableUnderline: true,
            }}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </Box>
        <Box className={classes.button}>
          <Button type="submit" variant="contained" size="large">
            Send
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ChatRoom;
