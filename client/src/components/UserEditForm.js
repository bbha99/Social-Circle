import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const UserEditForm = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    username: user.username || "",
    email: user.email || "",
    password: "",
    password_confirmation: "",
  });

  // populate form with user data when it's available
  useEffect(() => {
    if (user) {
      console.log("user object:", user);
      setFormData({
        username: user.username,
        email: user.email,
        password: "", // or user.encrypted_password
        password_confirmation: "", // or user.encrypted_password
      });
    }
  }, [user]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/users/${user.id}`,
        {
          user: formData,
        }
      );
      console.log(response.data);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 4,
        boxShadow: 1,
        bgcolor: "background.paper",
        p: 3,
        maxWidth: 400,
        mx: "auto",
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Confirm Password"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          type="password"
          margin="normal"
        />
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" type="submit">
            Update
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UserEditForm;
