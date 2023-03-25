import { useContext, useState, useEffect, useRef } from 'react';
import ChatInput from './ChatInput';
import axios from 'axios';
import { authContext } from '../../providers/AuthProvider';
import { Grid, List, Divider } from '@mui/material';
import { MessageLeft, MessageRight } from './Message';

const ChatBox = ({ cable, receiver }) => {
  const { user } = useContext(authContext);
  const [messages, setMessages] = useState([]);
  const endMessageRef = useRef(null);

  useEffect(() => {
    endMessageRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (receiver) {
      axios.post(`http://localhost:3001/chat_history`, {
        sender_id: user.id,
        receiver_id: receiver.id
      }, { withCredentials: true })
        .then((response) => {
          setMessages(response.data);
        });
    }
  }, [receiver, user.id]);

  useEffect(() => {
    if (user.id && receiver) {
      cable.subscriptions.create
        (
          {
            channel: 'ChatsChannel',
            user_id: user.id,
            receiver_id: receiver.id
          },
          {
            received: (message) => {
              setMessages([...messages, message]);
            }
          }
        );
    }
  }, [cable.subscriptions, user.id, receiver, messages]);

  return (
    <Grid item xs={9}>
      <List sx={{ height: "calc( 100vh - 200px )", overflowY: 'scroll' }} xs="true" >
        {messages.map((message, index) => {
          return (
            message.sender_id === user.id
              ?
              <MessageRight
                key={index}
                message={message.message}
                created_at={message.created_at}
              />
              :
              <MessageLeft
                key={index}
                message={message.message}
                created_at={message.created_at}
              />
          );
        })}
        <li ref={endMessageRef} ></li>
      </List>
      <Divider />
      <ChatInput
        receiver={receiver}
        messages={messages}
        setMessages={setMessages}
      />
    </Grid>
  );
};

export default ChatBox;