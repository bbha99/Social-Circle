import styled from '@emotion/styled';
import { Avatar, Box, Button, Card, CardActionArea, CardContent, CardMedia, List, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { authContext } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';

const Div = styled('div')({
  margin: (theme) => theme.spacing(1),
});

const ConversationProfile = (props) => {
  const [receivers, setReceivers] = useState([]);

  const { user } = useContext(authContext);

  useEffect(() => {
    axios.post(`http://localhost:3001/conversations`, {
      id: user.id
    }, { withCredentials: true })
      .then((response) => {
        setReceivers(response.data.users.slice(0, 5));
      });
  }, []);

  const suggestedChatPeople = receivers.map((person) => {
    return (
      <Box key={person.id}>
        <Link to={`/users/${person.id}`}>
          <Avatar sx={{ width: 30, height: 30 }} src={person.image} /> {person.username}</Link>
      </Box>
    );
  });

  return (
    <Card sx={{marginTop: "20px", height: "24%" }}>
      <CardContent>
        <Typography variant="h5">
          View Conversation Profiles
        </Typography>
        {suggestedChatPeople}
      </CardContent>
    </Card>
  );
};

export default ConversationProfile;
