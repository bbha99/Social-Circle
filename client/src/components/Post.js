import { FavoriteBorder, MoreHoriz, ChatBubbleOutline } from '@mui/icons-material';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, Fade, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import React from 'react';

// Individual post component
const Post = (props) => {

  // Delete post action
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ marginBottom: 2, maxHeight: 600 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ width: 50, height: 50 }} src={props.user.image} />
        }
        action={
          <div>
            <IconButton onClick={handleClick}>
              <MoreHoriz />
            </IconButton>
            <Menu
              id="fade-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleClose} sx={{ color: "blue", fontWeight: 500 }}>Edit</MenuItem>
              <MenuItem onClick={handleClose} sx={{ color: "red", fontWeight: 500 }}>Delete</MenuItem>
            </Menu>
          </div>
        }

        title={props.post.title}
        subheader={props.user.name + " March 14, 2023"}
      />

      <CardContent>
        <Typography component="p">
          {props.post.description}
        </Typography>
      </CardContent>

      {props.post.image &&
        <CardMedia
        component="img"
        height="400"
        image={props.post.image}
        alt="green iguana"
        sx={{ objectFit: "contain" }}
      />
      }


      <Divider variant="middle" sx={{ marginTop: 0.5 }} />

      <CardActions>
        <Button
          variant="text"
          fullWidth={true}
          type="submit">
          <FavoriteBorder />
          {/* <Favorite sx={{ color: "red" }} /> */}
          1 Likes
        </Button>
        <Button
          variant="text"
          fullWidth={true}
          type="submit">
          <ChatBubbleOutline />
          1 Comments
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;