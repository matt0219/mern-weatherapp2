import React from 'react';

const AirQuality = ({ airQuality }) => {
    if (!airQuality) {
        return null;
    }

    const { aqi, pollutants } = airQuality;

    // Function to get the air quality description based on the AQI value
    const getAQIDescription = (aqiReading) => {
        switch (aqiReading) {
            case 1: 
                return "The air quality is considered good, and air pollution poses little or no risk.";
            case 2:
                return "The air quality is acceptable; however, there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
            case 3: 
                return "Members of sensitive groups may experience health effects, but the general public is less likely to be affected.";
            case 4:
                return "Everyone may begin to experience adverse health effects, and members of sensitive groups may experience more serious health effects.";
            case 5:
                return "Health alert: everyone may experience more serious health effects."
            default:
                return "Unknown AQI reading";
        }
    };

    // Get air quality description based on the AQI value
    const aqiDescription = getAQIDescription(aqi);

    return (
        <div style={styles.container}>
            <h2>Air Quality Index (AQI): {aqi}</h2>
            <ul>
                {Object.entries(pollutants).map(([key, value]) => (
                    <li key={key} style={styles.resultText}>{`${key}: ${value.toFixed(2)}`}</li>
                ))}
            </ul>
            <div style={styles.aqiDescription}>
                <p>{aqiDescription}</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
      marginTop: '20px',
      padding: '10px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',  // Enable flex layout
      flexDirection: 'column',  // Stack items vertically
      alignItems: 'center',  // Center items horizontally
      textAlign: 'center',  // Center text within the container
    },
    heading: {
      fontSize: '1.5em',
      color: '#333',
      marginBottom: '10px',
      fontFamily: 'Noto Sans, sans-serif',
    },
    resultText: {
      fontSize: '1.2em',
      fontFamily: 'Noto Sans, sans-serif',
      listStyleType: 'none',
      marginLeft: '0',
    },
    aqiDescription: {
      marginTop: '10px',  // Adjusted marginTop to match resultText
      width: '80%',  // Adjusted width for better centering
      padding: '10px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'left',
    },
  };  

export default AirQuality;
