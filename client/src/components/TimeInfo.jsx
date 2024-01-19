import React from 'react';

const TimeInfo = ({ title, time }) => {
    return (
        <div style={styles.container}>
            <h2>{title}</h2>
            <p>{time}</p>
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
    timeInfo: {
        marginTop: '20px',
        width: '80%',
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'left',
    },
};

export default TimeInfo;