import styled from '@emotion/styled';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SearchIcon from "@mui/icons-material/Search";

const CardContainer = styled(Card)(({ theme }) => ({
  backgroundImage:
    "url('https://images.unsplash.com/photo-1445462657202-a0893228a1e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')",
  height: '400px',
  marginTop: '10px',
  backgroundSize: 'cover',
  display: "flex",
  // flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
}));

const Weather = (props) => {
  const [search, setSearch] = useState("Vancouver");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
      .then((response) => {
        // console.log("response.data: ", response.data);
        setData(response.data);
      });

  }, [search]);

  let weatherIcon = null;
  if (typeof data.main != "undefined") {
    if (data.weather[0].main == "Clouds") {
      weatherIcon = "bi-cloud";
    } else if (data.weather[0].main == "Thunderstorm") {
      weatherIcon = "bi-cloud-lightning";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon = "bi-cloud-drizzle";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon = "bi-cloud-rain";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon = "bi-cloud-snow";
    } else {
      weatherIcon = "bi-cloud-sun";
    }
  }

  let temp, temp_min, temp_max = "";
  if (data.length !== 0) {
    temp = (data.main.temp - 273.15).toFixed(2);
    temp_min = (data.main.temp_min - 273.15).toFixed(2);
    temp_max = (data.main.temp_max - 273.15).toFixed(2);
  }

  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: 'long' });
  let day = d.toLocaleString("default", { weekday: 'long' });

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(input);
    setInput("");
  };

  return (
    <CardContainer>

      <CardContent sx={{ color: "white" }}>
        <form component="form" onSubmit={handleSubmit}>
          <TextField
            placeholder="Search a city"
            value={input}
            sx={{ bgcolor: "white" }}
            onChange={(event) => { setInput(event.target.value); }}
            required
          />

          <Button type='submit' variant="contained">
          <SearchIcon />
          </Button>
        </form>
        <Typography variant="h4">
          {data.name}
        </Typography>
        <Typography variant="h5">
          {day}, {month} {date}, {year}
        </Typography>
        <div>
          <i className={`bi ${weatherIcon}`}></i>
        </div>
        <Typography variant="body1">
          {temp} &deg;C
        </Typography>
        <Typography variant="body1">
          {data.length !== 0 && data.weather[0].main}
        </Typography>
        <Typography variant="body1">
        H:{temp_max} &deg;C L:{temp_min} &deg;C
        </Typography>
      </CardContent>
    </CardContainer>
  );
};

export default Weather;
