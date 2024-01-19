import React from 'react';

const Forecast = ({ forecastData }) => {
    if (typeof forecastData !== 'object' || !forecastData.map) {
        return (
            <div style={styles.container}>
                <h2>Forecast</h2>
                <p>{forecastData}</p>
            </div>
        );
    };
};

const styles = {
    container: {
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',  
        flexDirection: 'column',  
        alignItems: 'center',  
        textAlign: 'center',
    },
    resultText: {
        fontSize: '1.2em',
        fontFamily: 'Noto Sans, sans-serif',
        listStyleType: 'none',
        marginLeft: '0',
        marginBottom: '10px',
    },
};

export default Forecast;