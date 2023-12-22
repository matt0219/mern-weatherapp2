import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [cities, setCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [airQuality, setAirQuality] = useState(null);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = () => {
    fetch('http://localhost:3001/api/cities')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setCities(data))
      .catch((error) => console.error('Error fetching data:', error));
  };

  const handleSearch = () => {
    if (!searchQuery) {
      alert('Please enter a location.');
      return;
    }

    const apiKey = import.meta.env.VITE_REACT_APP_OPENWEATHERMAP_API_KEY;
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}&units=imperial`;

    let weatherData; // Declare weatherData outside the promise chain

    axios
      .get(weatherApiUrl)
      .then((weatherResponse) => {
        weatherData = weatherResponse.data;

        // Extract latitude and longitude from the weather response
        const latitude = weatherData.coord.lat;
        const longitude = weatherData.coord.lon;

        // Update the air quality API URL with the correct latitude and longitude
        const airQualityApiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        return axios.get(airQualityApiUrl);
      })
      .then((airQualityResponse) => {
        const airQualityData = airQualityResponse.data.list[0];

        // Check if airQualityData is defined before accessing its properties
        if (airQualityData) {
          // Extract relevant information from the response
          const aqi = airQualityData.main.aqi;
          const pollutants = airQualityData.components;

          setAirQuality({
            aqi,
            pollutants,
          });
        } else {
          console.error('Air quality data is undefined.');
        }

        // Extract other weather information
        const temperatureFahrenheit = weatherData.main.temp;
        const humidity = weatherData.main.humidity;
        const windSpeed = weatherData.wind.speed;
        const forecast = weatherData.weather[0].description;

        setWeatherData({
          temperatureFahrenheit,
          humidity,
          windSpeed,
          forecast,
        });
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  const getWeatherByGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser.');
    }
  };

  const fetchWeatherData = (latitude, longitude) => {
    const apiKey = import.meta.env.VITE_REACT_APP_OPENWEATHERMAP_API_KEY;
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
    const airQualityApiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    axios
      .all([
        axios.get(weatherApiUrl),
        axios.get(airQualityApiUrl),
      ])
      .then(axios.spread((weatherResponse, airQualityResponse) => {
        const weatherData = weatherResponse.data;
        const airQualityData = airQualityResponse.data.list[0];

        // Check if airQualityData is defined before accessing its properties
        if (airQualityData) {
          // Extract relevant information from the response
          const aqi = airQualityData.main.aqi;
          const pollutants = airQualityData.components;

          setAirQuality({
            aqi,
            pollutants,
          });
        } else {
          console.error('Air quality data is undefined.');
        }

        // Extract other weather information
        const temperatureFahrenheit = weatherData.main.temp;
        const humidity = weatherData.main.humidity;
        const windSpeed = weatherData.wind.speed;
        const forecast = weatherData.weather[0].description;

        setWeatherData({
          temperatureFahrenheit,
          humidity,
          windSpeed,
          forecast,
        });
      }))
      .catch((error) => console.error('Error fetching data:', error));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Weather App</h1>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Enter location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>
          Search
        </button>
        <button onClick={getWeatherByGeolocation}>Get Weather Near Me</button>
      </div>
      {weatherData && (
        <div style={styles.weatherInfo}>
          <p>{`Temperature in ${searchQuery}: ${weatherData.temperatureFahrenheit.toFixed(2)}°F`}</p>
          <p>{`Humidity: ${weatherData.humidity}%`}</p>
          <p>{`Wind Speed: ${weatherData.windSpeed} m/s`}</p>
          <p>{`Forecast: ${weatherData.forecast}`}</p>
          <p>{`AQI: ${airQuality.aqi}`}</p>

          {airQuality.pollutants && (
            <ul>
              {Object.entries(airQuality.pollutants).map(([key, value]) => (
                <li key={key}>{`${key}: ${value.toFixed(2)}`}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: 'auto',
    marginTop: '50px',
  },
  heading: {
    fontSize: '2em',
    color: '#333',
    marginBottom: '20px',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  input: {
    padding: '8px',
    marginRight: '10px',
    fontSize: '1em',
  },
  button: {
    padding: '8px 16px',
    fontSize: '1em',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
  },
  weatherInfo: {
    marginTop: '20px',
  },
};

export default Home;
