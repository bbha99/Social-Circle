import styled from '@emotion/styled';
import { Avatar, Box, Button, Card, CardActionArea, CardContent, CardMedia, List, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { authContext } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import SearchBar from './Searchbar';

const Div = styled('div')({
  margin: (theme) => theme.spacing(1),
});

const SuggestedUser = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [receivers, setReceivers] = useState([]);

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
      <Box key={person.id}>
        <Link to={`/users/${person.id}`}>
          <Avatar sx={{ width: 30, height: 30 }} src={person.image} /> {person.username}</Link>
      </Box>
    );
  });

  return (
    <Card sx={{ marginTop: "60px", height: "28%" }}>
      <CardContent>
        <Typography variant="h5">
          {user ? "Meet New People" : "Meet People"}
        </Typography>
        <SearchBar />
        {suggestedPeople}
      </CardContent>
    </Card>
  );
};

export default SuggestedUser;
