import styled from '@emotion/styled';
import { Avatar, Box, Button, Card, CardActionArea, CardContent, CardMedia, List, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Div = styled('div')({
  margin: (theme) => theme.spacing(1),
});

const SuggestedUser = (props) => {
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    axios
      .get(`http://localhost:3001/users`)
      .then((response) => {
        setSearchResults(response.data.users.slice(0, 5));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const suggestedPeople = searchResults.map((person) => {
    return (
      <Box key={person.id}>
        <Link to={`/users/${person.id}`}>
          <Avatar sx={{ width: 30, height: 30 }} src={person.image} /> {person.username}</Link>
      </Box>
    );
  });

  return (
    <Card sx={{ marginTop: "20px" }}>
      <CardContent>
        <Typography variant="h3">
          Find Discussers
        </Typography>
        {suggestedPeople}
      </CardContent>
    </Card>
  );
};

export default SuggestedUser;
