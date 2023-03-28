import { List, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import { useContext } from "react";
import * as React from 'react';
import { topicContext } from '../providers/TopicProvider';
import ListItemButton from '@mui/material/ListItemButton';

const Div = styled('div')({
  margin: (theme) => theme.spacing(1),
});

const TopicList = (props) => {
  const { topicList, setSelectedTopicId, selectedTopicId } = useContext(topicContext);

  const handleListItemClick = (index) => {
    setSelectedTopicId(index);
  };

  return (
    <Div>
      <List>
        <ListItemButton
          key={0}
          selected={selectedTopicId === 0}
          onClick={(event) => handleListItemClick(0)}
        >
          <ListItemText primary="All Topics" />
        </ListItemButton>
        {topicList.map((topic) => (
          <ListItemButton
            key={topic.id}
            selected={selectedTopicId === topic.id}
            onClick={(event) => handleListItemClick(topic.id)}
          >
            <ListItemText primary={topic.name} />
          </ListItemButton>
        ))}
      </List>
    </Div>
  );
};

export default TopicList;
