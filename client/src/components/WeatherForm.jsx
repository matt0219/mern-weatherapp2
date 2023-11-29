import React, { useState } from 'react';

const WeatherForm = ({ onSubmit }) => {
    const [description, setDescription] = useState('');
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit the form data
        onSubmit({ description, temperature, humidity });
        // Clear the form
        setDescription('');
        setTemperature('');
        setHumidity('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Description:
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <label>
                Temperature:
                <input
                    type="number"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                />
            </label>
            <label>
                Humidity:
                <input
                    type="number"
                    value={humidity}
                    onChange={(e) => setHumidity(e.target.value)}
                />
            </label>
            <button type="submit">Add Weather</button>
        </form>
    );
};

export default WeatherForm;