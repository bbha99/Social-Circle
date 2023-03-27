import { styled, ListItem, Grid, ListItemText } from '@mui/material';

const convertDateTime = (datetime) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(Date.parse(datetime));
  const day = date.getDate();
  const month = months[date.getMonth()];
  const hours = date.getHours();
  let minutes = date.getMinutes().toString();
  if (minutes.length === 1) {
    minutes = 0 + minutes;
  }
  return `${month} ${day} at ${hours}:${minutes}`;
};

const MessageBlue = styled(Grid)({
  float: "right",
  position: "relative",
  marginRight: "20px",
  marginBottom: "10px",
  padding: "0px 10px",
  backgroundColor: "#a8ddfd",
  maxWidth: "60%",
  textAlign: "right",
  borderRadius: "10px",
});

const MessageGrey = styled(Grid)({
  position: "relative",
  marginLeft: "20px",
  marginBottom: "10px",
  padding: "0px 10px",
  backgroundColor: "#d1d1e0",
  maxWidth: "60%",
  textAlign: "left",
  borderRadius: "10px",
});

const MessageRight = ({ index, message, created_at }) => {
  return (
    <ListItem key={index} sx={{ justifyContent: "flex-end" }}>
      <MessageBlue>
        <Grid container>
          <Grid item xs={12}>
            <ListItemText align="right" primary={message} />
          </Grid>
          <Grid item xs={12}>
            <ListItemText align="right" secondary={convertDateTime(created_at)} secondaryTypographyProps={{ fontSize: '0.7rem' }} />
          </Grid>
        </Grid>
      </MessageBlue>
    </ListItem>
  );
};

const MessageLeft = ({ index, message, created_at }) => {
  return (
    <ListItem key={index}>
      <MessageGrey>
        <Grid container>
          <Grid item xs={12}>
            <ListItemText align="left" primary={message} />
          </Grid>
          <Grid item xs={12}>
            <ListItemText align="left" secondary={convertDateTime(created_at)} secondaryTypographyProps={{ fontSize: '0.7rem' }} />
          </Grid>
        </Grid>
      </MessageGrey>
    </ListItem>
  );
};

export { MessageRight, MessageLeft };