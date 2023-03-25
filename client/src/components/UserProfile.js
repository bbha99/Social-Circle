import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Avatar, Box, Typography } from "@mui/material";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/${id}`)
      .then((response) => {
        setUser(response.data);
        console.log('response', response.data.post)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Avatar
        src={user.user.image}
        alt={user.user.username}
        sx={{ width: "200px", height: "200px", mt: "2rem" }}
      />
      <Typography variant="h4" sx={{ mt: "2rem" }}>
        {user.user.username}
      </Typography>
      <Typography variant="h1">Posts:</Typography>
      {user.post.map((post) => (
        <Box key={post.id} sx={{ mt: "1rem" }}>
          <Typography variant="h5">{post.title}</Typography>
          <Typography variant="body1">{post.description}</Typography>
          <img src={post.image} alt={post.title} />
        </Box>
      ))}

    </Box>
  );
};

export default UserProfile;
