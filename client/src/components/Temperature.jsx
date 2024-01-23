import React from 'react';

const Temperature = ({ temperature, location }) => {
    if (typeof temperature !== 'number') {
        return null;
    }

    return (
        <div style={styles.container}>
            <h2>Temperature</h2>
            <p>{`${location}: ${temperature.toFixed(2)}°F`}</p>
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

export default Temperature;