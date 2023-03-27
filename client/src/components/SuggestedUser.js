import styled from '@emotion/styled';
import { Avatar, Card, CardContent, List, ListItemText, Typography, ListItem, ListItemIcon } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { authContext } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import SearchBar from './Searchbar';

const Div = styled('div')({
  margin: (theme) => theme.spacing(1),
});

const SuggestedUser = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [receivers, setReceivers] = useState([]);
  const navigate = useNavigate();

  const { user } = useContext(authContext);

  useEffect(() => {
    if (user) {
      axios.post(`http://localhost:3001/meet_people`, {
        id: user.id
      }, { withCredentials: true })
        .then((response) => {
          setReceivers(response.data.users);
        });
    } else {
      axios
        .get(`http://localhost:3001/users`)
        .then((response) => {
          setSearchResults(response.data.users.slice(0, 3));
        })
        .catch((error) => {
          console.error(error);
        });
    }

    axios
      .get(`http://localhost:3001/users`)
      .then((response) => {
        setReceivers(response.data.users.slice(0, 3));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const suggestedPeople = receivers.slice(0, 3).map((person) => {
    return (
      <ListItem button
        key={person.id}
        onClick={() => navigate(`/users/${person.id}`)}
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
    <Card sx={{ marginTop: "60px", height: "28%" }}>
      <CardContent>
        <Typography variant="h5">
          {user ? "Meet New People" : "Meet People"}
        </Typography>
        <SearchBar />
        <List>
          {suggestedPeople}
        </List>
      </CardContent>
    </Card>
  );
};

export default SuggestedUser;
