import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = '37fb90eecdae3d61fdcceaebeeee6218'; // Replace with your own API key

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`
                );
                setWeatherData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchWeatherData();
    }, []);

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Weather Details</h2>
            <p>City: {weatherData.name}</p>
            <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
            <p>Description: {weatherData.weather[0].description}</p>
        </div>
    );
};

export default Weather;
