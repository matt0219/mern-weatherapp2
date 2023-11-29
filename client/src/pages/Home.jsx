import React, { useState, useEffect } from 'react';
import CityList from '../components/CityList';

const Home = () => {
  const [cities, setCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);

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
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}&units=imperial`;

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const temperatureFahrenheit = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const forecast = data.weather[0].description;

        setWeatherData({
          temperatureFahrenheit,
          humidity,
          windSpeed,
          forecast,
        });
      })
      .catch((error) => console.error('Error fetching weather data:', error));
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
      </div>
      {weatherData && (
        <div style={styles.weatherInfo}>
          <p>{`Temperature in ${searchQuery}: ${weatherData.temperatureFahrenheit.toFixed(2)}°F`}</p>
          <p>{`Humidity: ${weatherData.humidity}%`}</p>
          <p>{`Wind Speed: ${weatherData.windSpeed} m/s`}</p>
          <p>{`Forecast: ${weatherData.forecast}`}</p>
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
