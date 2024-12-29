import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = useState(''); 
  const [weatherData, setWeatherData] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const apiKey = '8ac5c4d57ba6a4b3dfcf622700447b1e'; 

  
  const fetchWeatherData = async () => {
    if (!city) return; 

    setLoading(true); 
    setError(null); 

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data');
      setWeatherData(null); 
    } finally {
      setLoading(false); 
    }
  };

  const handleCitySubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="app">
      <div className="left-column">
        <h1>Weather App</h1>

        <form onSubmit={handleCitySubmit}>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="city-input"
          />
          <button type="submit">Get Weather</button>
        </form>

        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
      </div>

      <div className="right-column">
        {weatherData && !loading && !error && (
          <div className="weather-card">
            <h2>{weatherData.name}</h2>
            <p><strong>{weatherData.weather[0].description}</strong></p>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            <p>Pressure: {weatherData.main.pressure} hPa</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
