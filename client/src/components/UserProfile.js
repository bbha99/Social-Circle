import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Grid,
  Paper,
  Typography,
  Container,
  Button,
  
} from "@mui/material";
import { sizing } from "@mui/system";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import UserEditForm from "./UserEditForm";
import { authContext } from "../providers/AuthProvider";
import { useContext } from "react";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const { user: loggedInUser, auth } = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    setEditing(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }
  const isOwnProfile = loggedInUser && loggedInUser.id === user.user.id;
  return (
    <Box sx={{ bgcolor: "#EAF6FF", py: "2rem" }}>
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: "2rem",
          }}
        >
          <Avatar
            src={user.user.image}
            alt={user.user.username}
            sx={{ width: "200px", height: "200px", mb: "2rem" }}
          />
          <Typography variant="h4">{user.user.username}</Typography>
          <br></br>
          {!isOwnProfile && (
            <Button
              variant="contained"
              onClick={() => {
                auth
                  ? navigate("/chats", { state: user.user })
                  : navigate("/login");
              }}
            >
              Start conversation
            </Button>
          )}
          <br></br>
          <Box sx={{ display: "flex", alignItems: "center", mb: "1rem" }}>
            {editing ? (
              <UserEditForm
                user={user.user}
                onClose={handleCancel}
                onUpdate={handleUserUpdate}
              />
            ) : (
              <>
                {isOwnProfile && (
                  <Button
                    variant="outlined"
                    onClick={handleEdit}
                    startIcon={<EditIcon />}
                  >
                    Edit Profile
                  </Button>
                )}
              </>
            )}
          </Box>
        </Box>
        <Grid container spacing={2}>
          {user.post.map((post) => {
            if (post.deleted !== true) {
              return (
                <Grid item key={post.id} xs={12}>
                  <Paper
                    sx={{
                      p: "1rem",
                      borderRadius: "1rem",
                      border: "2px solid #9CA3AF",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", mb: "1rem" }}
                    >
                      <Avatar
                        src={post.image}
                        alt={post.username}
                        sx={{ width: "50px", height: "50px", mr: "1rem" }}
                      />
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="subtitle2">
                          {post.username}
                        </Typography>
                        <Typography variant="h6">{post.title}</Typography>
                        <Typography variant="caption">
                          {moment(post.created_at).fromNow()}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body1" sx={{ mb: "1rem" }}>
                      {post.description}
                    </Typography>
                    <img
                      src={post.image}
                      alt={post.title}
                      style={{ width: "60%", height: "50%", borderRadius: "1rem" }}
                    />
                  </Paper>
                </Grid>
              );
            }
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default UserProfile;
