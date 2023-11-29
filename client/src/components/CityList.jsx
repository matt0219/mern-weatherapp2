import React from 'react';
import { Link } from 'react-router-dom';

const CityList = ({ cities }) => {
    return (
        <ul>
            {cities.map((city) => (
                <li key={city._id}>
                    <Link to={`/cities/${city._id}`}>{city.name}</Link>
                </li>
            ))}
        </ul>
    );
};

export default CityList;