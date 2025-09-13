import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
  ToggleButton,
  Container,
  Paper
} from "@mui/material";

const WeatherApp = () => {
  const Apikey = "fceca83a4273a40f02428024af8bc353";

  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("celsius");

  const fetchWeather = async () => {
    if (!/^[a-zA-Z\s]+$/.test(city)) {
      setError("Please enter a valid city name (only letters)");
      return;
    }

    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Apikey}&units=metric`
      );
      console.log(response?.data);

      setWeatherData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("City not found.");
      } else {
        setError("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  const getTemperature = () => {
    if (!weatherData) return null;

    const tempCelsius = weatherData.main.temp;

    if (unit === "celsius") {
      return `${Math.round(tempCelsius)}°C`;
    } else {
      const tempFahrenheit = (tempCelsius * 9) / 5 + 32;
      return `${Math.round(tempFahrenheit)}°F`;
    }
  };

  return (
    <Container align="center">
      <Paper elevatiol={7}
      
         sx={{ 
              mt:5,
              bgcolor:"grey",
              width:"600px",
              p:4,
              
             }}
      >

    
        <Typography
            variant="h5"
            gutterBottom
            sx={{ color: "white",
              mt:5
             }}
            
          >
            WeatherApp 🌤️
          </Typography>
       <Box sx={{ p: 4, textAlign: "center" }}>
      {/* Input and Button */}

      <Card
        sx={{
          maxWidth: 500,
          mx: "auto",
          mt: 3,
          p: 2,
          mb: 3,
          boxShadow: 3,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          bgcolor: "skyblue",
          maxHeight: "400px",
        }}
      >
        <CardContent sx={{Type:'horizontal'}}>
           <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            mb: 3,
          }}
        >
        

          <TextField
            label="Enter your city"
            variant="outlined"
            onChange={(e) => setCity(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <Box>
            <Button
              variant="outlined"
              color="blue"
              size="medium"
              onClick={fetchWeather}
              sx={{ color: "blue" }}
            >
              Submit
            </Button>
          </Box>
        </Box>
        </CardContent>
       
      </Card>

      {/* Loading */}
      {loading && <CircularProgress />}

      {/* Weather Card */}
      {weatherData?.main && (
        <Card
          sx={{
            maxWidth: 400,
            mx: "auto",
            mt: 3,
            p: 2,
            mb: 3,
            boxShadow: 3,
            borderRadius: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "skyblue",
          }}
        >
          <CardContent>
            <Typography sx={{ color: "yellow" }}>
              Weather Information
            </Typography>

            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: "text.secondary" }}
            >
              📍 {weatherData.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {weatherData.weather[0].description}
            </Typography>

            <Box sx={{ textAlign: "left", mt: 2 }}>
              <Typography sx={{ color: "white" }}>
                Temperature: 🌡️ {getTemperature()}
              </Typography>
              {/* <Typography>
                Temperature: {weatherData.main.temp} °C
              </Typography> */}

              <Typography sx={{ color: "white" }}>
                Condition : {weatherData.weather[0].description}
              </Typography>
              <Typography sx={{ color: "white" }}>
                Humidity:💧 {weatherData.main.humidity}%
              </Typography>

              {/* <p>Condition: {weatherData.weather[0].description}</p> */}
              {/* <p>
                Coordinates: Lat: {weatherData.coord.lat}, Lon:{" "}
                {weatherData.coord.lon}
              </p> */}

             

              <div>
                {/* <button
                  onClick={() => setUnit("celsius")}
                  disabled={unit === "celsius"}
                >
                  Celsius
                </button> */}
                <ToggleButton
                  onClick={() => setUnit("celsius")}
                  disabled={unit === "celsius"}
                  color="secondary"
                >
                  Celcius
                </ToggleButton>
                &nbsp;
                {/* <button
                  onClick={() => setUnit("fahrenheit")}
                  disabled={unit === "fahrenheit"}
                >
                  Fahrenheit
                </button> */}
                <ToggleButton
                  onClick={() => setUnit("fahrenheit")}
                  disabled={unit === "fahrenheit"}
                  color="secondary"
                >
                  Fahrenheit
                </ToggleButton>
              </div>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
      </Paper>
    </Container>
   
  );
};

export default WeatherApp;
