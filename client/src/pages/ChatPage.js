import { Grid, Paper } from '@mui/material';
import ChatList from '../components/chat/ChatList';
import Navbar from '../components/Navbar';

const ChatPage = ({ cable }) => {
  return (
    <>
      <Navbar />
      <Grid container component={Paper} sx={{ height: "calc( 100vh - 64px )", }}>
        <ChatList cable={cable} />
      </Grid>
    </>
  );
};

export default ChatPage;