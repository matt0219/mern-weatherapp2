import React from 'react';

const WindSpeed = ({ windSpeed }) => {
  if (typeof windSpeed !== 'object') {
    // If windSpeed is a number, just display it as is
    return (
      <div style={styles.container}>
        <h2>Wind Speed</h2>
        <p>{`Speed: ${windSpeed.toFixed(2)} m/s`}</p>
      </div>
    );
  }
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
};

export default WindSpeed;
