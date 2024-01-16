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
                    <li key={key}>{`${key}: ${value.toFixed(2)}`}</li>
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
};

export default AirQuality;