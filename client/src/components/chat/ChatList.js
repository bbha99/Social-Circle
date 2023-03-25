import { useContext, useState, useEffect } from 'react';
import { authContext } from '../../providers/AuthProvider';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Grid, List, ListItem, ListItemIcon, Avatar, ListItemText } from '@mui/material';
import ChatBox from './ChatBox';

const ChatList = ({ cable }) => {
  const { user } = useContext(authContext);
  const location = useLocation();
  const [receiver, setReceiver] = useState(location.state || null);
  const [receivers, setReceivers] = useState([receiver]);

  const ids = [];
  const userList = [];

  window.history.replaceState(null, '');

  useEffect(() => {
    axios.post(`http://localhost:3001/conversations`, {
      id: user.id
    }, { withCredentials: true })
      .then((response) => {
        setReceivers([...receivers, ...response.data.users]);
      });
  }, []);

  for (const r of receivers) {
    if (r) {
      if (!ids.includes(r.id)) {
        ids.push(r.id);

        userList.push(
          <ListItem button
            key={r.id}
            onClick={() => setReceiver(r)}
          >
            <ListItemIcon>
              <Avatar alt={r.username} src={r.image} />
            </ListItemIcon>
            <ListItemText primary={r.username} />
          </ListItem>
        );
      }
    }
  };

  return (
    <>
      <Grid item xs={3} sx={{ borderRight: '1px solid #e0e0e0' }}>
        <List>
          {userList}
        </List>
      </Grid>
      {receiver && <ChatBox cable={cable} receiver={receiver} />}
    </>
  );
};

export default ChatList;