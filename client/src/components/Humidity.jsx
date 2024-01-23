import React from 'react';

const Humidity = ({ humidity }) => {
    if (typeof humidity !== 'number') {
        return null;
    }

    return (
        <div style={styles.container}>
            <h2>Humidity</h2>
            <p>{`Humidity: ${humidity}%`}</p>
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
};

export default Humidity;