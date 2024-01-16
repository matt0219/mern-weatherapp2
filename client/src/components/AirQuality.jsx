import React from 'react';

const AirQuality = ({ airQuality }) => {
    if (!airQuality) {
        return null;
    }

    const { aqi, pollutants } = airQuality;

    return (
        <div style={styles.container}>
            <h2>Air Quality Index (AQI): {aqi}</h2>
            <ul>
                {Object.entries(pollutants).map(([key, value]) => (
                    <li key={key} style={styles.resultText}>{`${key}: ${value.toFixed(2)}`}</li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgb(0, 0, 0, 0.1)',
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
    },
};

export default AirQuality;