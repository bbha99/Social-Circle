import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import { useContext } from "react";
import { authContext } from "../providers/AuthProvider";

const SearchBar = () => {
  const [search, setSearch] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const { user } = useContext(authContext);

  useEffect(() => {
    // Displays all users who user has not started a conversation with
    if (user) {
      axios.post(`http://localhost:3001/meet_people`, {
        id: user.id
      }, { withCredentials: true })
        .then((response) => {
          const filteredData = response.data.users.filter((curUser) => {
            if (curUser.id !== user.id) {
              return curUser.username.toLowerCase();
            }
          });
          setSearchResults(filteredData);
        })
        .catch((error) => {
          console.error(error);
        });

    } else {
      // Displays all users for not logged in user
      axios
        .get(`http://localhost:3001/users`)
        .then((response) => {
          const filteredData = response.data.users.filter((curUser) => {
            return curUser.username.toLowerCase();
          });
          setSearchResults(filteredData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const arr = searchResults.slice(0, 5).map((option) => {
    return ({
      id: option.id,
      label: option.username
    });
  });

  return (
    <div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={arr}
        sx={{ width: 300 }}
        onChange={(event, newValue) => {
          setSearch(newValue);
          if (search) {
            navigate(`/users/${newValue.id}`);
          }
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => <TextField {...params} label="Find a user" />}
      />
    </div>

  );
};

export default SearchBar;