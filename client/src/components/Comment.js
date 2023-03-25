import { MoreHoriz } from '@mui/icons-material';
import { Avatar, Card, CardContent, CardHeader, Fade, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import React from 'react';
import { useContext } from "react";
import { authContext } from '../providers/AuthProvider';
import moment from 'moment';
const Comment = (props) => {

  // Current user
  const { user } = useContext(authContext);

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
    <Card sx={{ marginBottom: 2, borderLeft: 3 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ width: 30, height: 30 }} src={props.commentOwner.image} />
        }
        action={user && user.id === props.commentOwner.id &&
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
        subheader={props.commentOwner.username + " " + moment(props.created_at).fromNow()}
      />
      <CardContent>
        <Typography component="p">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Comment;