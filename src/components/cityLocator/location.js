import React from 'react'
import { useEffect, useState } from 'react';

function IP() {

  const [city, citySet] = useState('City not found');
  const [overall, overallSet] = useState('Could not reach weather data');
  const [wind, windSet] = useState(0);
  const [temperature, temperatureSet] = useState(0);

  let weather = {
    temperature: 0,
    overall: null,
    wind: 0,
  }

  // possible overall:
  let weatherConditions = ['Mist', 'Clouds', 'Clear']

  useEffect(() => {



    async function getLocation() {
      try {
        const locationAPIKey = '3e2afa18d85c4564a12ca3c8ac7f8300'
        const locationResponse = await fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${locationAPIKey}`);
        const locationData = await locationResponse.json();
        citySet(locationData.city.name);

        const apiKey = '71bf921d4b7b00af38a08d679c35ea3b';
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData.location.latitude}&lon=${locationData.location.longitude}&units=metric&appid=${apiKey}`);
        const weatherPayload = await weatherResponse.json();

        weather.temperature = weatherPayload.main.temp;
        weather.overall = weatherPayload.weather[0].main;
        weather.wind = weatherPayload.wind.speed;


        temperatureSet(weather.temperature)
        windSet(weather.wind)
        overallSet(weather.overall)
      } catch (error) {
        console.error(error);
      }
    };


    getLocation();

  }, []);

  return (
    <div>
      <div>City: <b>{city}</b></div>
      <div>Weather outside: {overall}</div>
      <div>Current temperature: {temperature}c°</div>
      <div>Wind speed: {wind}m/s</div>
      
    </div>
  )
}

export default IP;
