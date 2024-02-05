import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav style={styles.navigation}>
            <Link to="/login" style={styles.loginLink}>
                Login
            </Link>
        </nav>
    );
};

const styles = {
    navigation: {
        position: 'absolute',
        top: '10px',
        right: '10px',
    },
    loginLink: {
        textDecoration: 'none',
        color: '#333',
        fontSize: '1.2em',
        fontWeight: 'bold',
    },
};

export default Navigation;