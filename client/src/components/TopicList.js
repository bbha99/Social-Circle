import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  listItem: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.info.main,
    },
  },
}));

const TopicList = (props) => {
  const classes = useStyles();
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/admin/topics")
      .then((response) => {
        console.log("topic response", response.data);
        setTopics(response.data);
      })
      .catch((error) => {
        console.error("Error fetching topics: ", error);
      });
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Topics
      </Typography>
      <List>
        {topics.map((topic) => (
          <ListItem
            key={topic.id}
            className={classes.listItem}
            component={Link}
            to={`/topics/${topic.id}`}
          >
            <ListItemText primary={topic.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TopicList;
