import { Avatar, Card, CardContent, List, ListItemText, Typography, ListItem, ListItemIcon } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { authContext } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const ConversationProfile = (props) => {
  const [receivers, setReceivers] = useState([]);
  const navigate = useNavigate();

  const { user } = useContext(authContext);

  useEffect(() => {
    axios.post(`http://localhost:3001/conversations`, {
      id: user.id
    }, { withCredentials: true })
      .then((response) => {
        setReceivers(response.data.users.slice(0, 3));
      });
  }, []);

  const suggestedChatPeople = receivers.map((person) => {
    return (
      <ListItem button
        key={person.id}
        onClick={() => navigate('/chats', { state: person })}
        sx={{ padding: '0px', marginBottom: '10px' }}
      >
        <ListItemIcon>
          <Avatar alt={person.username} src={person.image} />
        </ListItemIcon>
        <ListItemText primary={person.username} />
      </ListItem>
    );
  });

  return (
    <Card sx={{ marginTop: "20px", height: "20%" }}>
      <CardContent>
        <Typography variant="h5">
          My conversations
        </Typography>
        <List>
          {suggestedChatPeople}
        </List>
      </CardContent>
    </Card>
  );
};

export default ConversationProfile;
