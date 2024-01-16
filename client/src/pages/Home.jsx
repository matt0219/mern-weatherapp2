import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AirQuality from '../components/AirQuality';

const Home = () => {
  const [cities, setCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchCities();
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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

    let weatherData;

    axios
      .get(weatherApiUrl)
      .then((weatherResponse) => {
        weatherData = weatherResponse.data;

        const latitude = weatherData.coord.lat;
        const longitude = weatherData.coord.lon;

        const airQualityApiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        return axios.get(airQualityApiUrl);
      })
      .then((airQualityResponse) => {
        const airQualityData = airQualityResponse.data.list[0];
      
        if (airQualityData) {
          const aqi = airQualityData.main.aqi;
          const pollutants = airQualityData.components;
      
          setAirQuality({
            aqi,
            pollutants,
          });
        } else {
          console.error('Air quality data is undefined.');
        }
      
        const temperatureFahrenheit = weatherData.main.temp;
        const humidity = weatherData.main.humidity;
        const windSpeed = weatherData.wind.speed;
      
        // Check if the forecast data is available
        if (weatherData.daily && weatherData.daily.length >= 6) {
          const forecastData = weatherData.daily?.slice(1, 6);

          if (forecastData) {
            const chartLabels = forecastData.map(day => format(new Date(day.dt * 1000), 'MMM dd'));
            const temperatureData = forecastData.map(day => day.temp.day);

            setChartData({
              labels: chartLabels,
              datasets: [
                {
                  label: 'Temperature (°F)',
                  data: temperatureData,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  fill: false,
                  yAxisID: 'temperature-y-axis',
                }
              ]
            })
          }
        } else {
          console.error('Forecast data is undefined or insufficient.');
          console.log('Full weatherData:', weatherData);
        }
      })
      
      
      
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Weather App</h1>
      {chartData && (
        <div style={styles.chartContainer}>
          <Line data={chartData} />
        </div>
      )}
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
          <p>{`${'Temperature in'} ${searchQuery}: ${weatherData.temperatureFahrenheit.toFixed(2)}°F`}</p>
          <p>{`${'Humidity'}: ${weatherData.humidity}%`}</p>
          <p>{`${'Wind Speed'}: ${weatherData.windSpeed} m/s`}</p>
          <p>{`${'Forecast'}: ${weatherData.forecast}`}</p>
          <p>{`${'Sunrise'}: ${weatherData.sunrise}`}</p>
          <p>{`${'Sunset'}: ${weatherData.sunset}`}</p>
        </div>
      )}
      <AirQuality airQuality={airQuality} />
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
  chartContainer: {
    marginTop: '20px',
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
