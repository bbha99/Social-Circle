import styled from '@emotion/styled';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, List, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Div = styled('div')({
  margin: (theme) => theme.spacing(1),
});

const SuggestedUser = (props) => {
  // const { topicList, setSelectedTopicId, selectedTopicId } = useContext(topicContext);

  const handleListItemClick = (index) => {
    // setSelectedTopicId(index);
  };

  return (
    <Div>
      <List>
        <ListItemButton
          key={0}
          // selected={selectedTopicId === 0}
          onClick={(event) => handleListItemClick(0)}
        >
          <ListItemText primary="All Topics" />
        </ListItemButton>
        {/* {topicList.map((topic) => (
          <ListItemButton
            key={topic.id}
            selected={selectedTopicId === topic.id}
            onClick={(event) => handleListItemClick(topic.id)}
          >
            <ListItemText primary={topic.name} />
          </ListItemButton>
        ))} */}
      </List>
    </Div>
  );
};

export default SuggestedUser;
