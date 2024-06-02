import React, { useState, useEffect } from 'react';
import LoadingIndicator from './LoadingIndicator';
import axios from 'axios';

const Weather = ({ city }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (!city) return;

    setLoading(true);
    setError(null);
    setWeatherData(null);

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f7aac6ad43f0d1cf7ea6235fda07e8dd`)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((err) => {
        const errorMessage = err.response && err.response.data && err.response.data.message 
          ? err.response.data.message 
          : 'Network Error';
        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [city]);
  return (
    <div>
      {loading && <LoadingIndicator />}
      {error && <p>Error: {error}</p>}
      {weatherData && (
        <div>
          <h3>Weather in {weatherData.name}</h3>
          <p>Temperature: {(weatherData.main.temp-273.15).toFixed(2)}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}</p>
          <p>Wind speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
