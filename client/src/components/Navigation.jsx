import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleButtonClick = () => {
        if (location.pathname === '/login') {
            // If on the login page, redirect to the homepage
            navigate('/');
        } else {
            // If on any other page, redirect to the login page
            navigate('/login');
        }
    };

    return (
        <nav style={styles.navigation}>
            <button onClick={handleButtonClick} style={styles.loginButton}>
                {location.pathname === '/login' ? 'Home' : 'Login'}
            </button>
        </nav>
    );
};

const styles = {
    navigation: {
        position: 'absolute',
        top: '10px',
        right: '10px',
    },
    loginButton: {
        textDecoration: 'none',
        color: '#333',
        fontSize: '1.2em',
        fontWeight: 'bold',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
    },
};

export default Navigation;