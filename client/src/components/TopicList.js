import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useContext } from "react";
import { topicContext } from '../providers/TopicProvider';

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
  const { topicList } = useContext(topicContext);
  return (
    <Div>
      <TitleTypography>Topics</TitleTypography>
      <List>
        {topicList.map((topic) => (
          <ListTopics
            key={topic.id}
            component={Link}
            to={`/topics/${topic.id}`}
          >
            <ListItemText primary={topic.name} />
          </ListTopics>
        ))}
      </List>
    </Div>
  );
};

export default TopicList;
