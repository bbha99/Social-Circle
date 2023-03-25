import { useState, useContext } from 'react';
import axios from 'axios';
import { authContext } from '../../providers/AuthProvider';
import { Box, Grid, TextField, Fab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function ChatInput({ receiver, messages, setMessages }) {
  const { user } = useContext(authContext);
  const [chatInput, setChatInput] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (chatInput !== '') {
      axios.post(`http://localhost:3001/create_message`, {
        sender_id: user.id,
        receiver_id: receiver.id,
        message: chatInput
      }, { withCredentials: true })
        .then((response) => {
          setChatInput('');
          setMessages([...messages, response.data]);
        });
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container sx={{ padding: '20px', position: "fixed", bottom: "0px", width: '75%', alignItems: 'flex-end' }} spacing={1} >
        <Grid item xs>
          <TextField
            multiline
            rows={2}
            label="Write a message"
            sx={{ width: '100%' }}
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          />
        </Grid>
        <Grid align="right" sx={{ width: '50px', marginLeft: 3 }}>
          <Fab type="submit" color="primary" aria-label="Add"><SendIcon /></Fab>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChatInput;