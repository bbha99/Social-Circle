import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useContext } from "react";
import * as React from 'react';
import { topicContext } from '../providers/TopicProvider';
import ListItemButton from '@mui/material/ListItemButton';

const Div = styled('div')({
  margin: (theme) => theme.spacing(1),
});

const TitleTypography = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h4.fontSize,
}));

const ListTopics = styled(ListItem)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.info.main,
  },
}));

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
