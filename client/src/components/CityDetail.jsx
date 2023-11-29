import React from 'react';

const CityDetail = ({ city }) => {
    return (
        <div>
            <h2>{city.name}</h2>
            <p>Country: {city.country}</p>
            <h3>Weather Information</h3>
            <ul>
                {city.weather.map((weather) => (
                    <li key={weather._id}>
                        <p>Description: {weather.description}</p>
                        <p>Temperature: {weather.temperature}°C</p>
                        <p>Humidity: {weather.humidity}%</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CityDetail;