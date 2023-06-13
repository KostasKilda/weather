import React from 'react'
import './style.css';
import windLogo from '../../images/windSpeed.png'
import tempLogo from '../../images/temp.png'
import hotTempLogo from '../../images/hotTemp.png'
import coldTempLogo from '../../images/coldTemp.png'

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

  // possible {overall} conditions:
  let weatherConditions = ['Mist', 'Clouds', 'Clear', 'Rain']


  function makeItRain() {
    console.log('Making it rain')
    let increment = 0;
    let drops = "";
    let backDrops = "";

    while (increment < 100) {
      let randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);
      let randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2);
      increment += randoFiver;

      drops += `<div class="drop" style="left: ${increment}%; bottom: ${randoFiver + randoFiver - 1 + 100
        }%; animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;">
            <div class="stem" style="animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;"></div>
            <div class="splat" style="animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;"></div>
          </div>`;

      backDrops += `<div class="drop" style="right: ${increment}%; bottom: ${randoFiver + randoFiver - 1 + 100
        }%; animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;">
            <div class="stem" style="animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;"></div>
            <div class="splat" style="animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;"></div>
          </div>`;
    }

    const rainFrontRow = document.querySelector('.rain.front-row');
    rainFrontRow.innerHTML = drops;
  }





  useEffect(() => {
    async function getLocation() {
      try {
        
        const locationResponse = await fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${process.env.REACT_APP_locationAPIKey}`);
        const locationData = await locationResponse.json();
        citySet(locationData.city.name);

        
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData.location.latitude}&lon=${locationData.location.longitude}&units=metric&appid=${process.env.REACT_APP_weatherAPIkey}`);
        const weatherPayload = await weatherResponse.json();

        weather.temperature = weatherPayload.main.temp;
        weather.overall = weatherPayload.weather[0].main;
        weather.wind = weatherPayload.wind.speed;


        temperatureSet(weather.temperature)
        windSet(weather.wind)
        overallSet(weather.overall)

        console.log(weather.overall)

        if (weather.overall == 'Mist' || weather.overall == 'Rain') {
          makeItRain();
        }
        else if (weather.overall == 'Clouds') {
          let classList = document.getElementsByClassName('weatherAnimation')
          if (classList[0].children.length < 1) {
            const clouds = document.createElement('div')
            clouds.setAttribute('class', 'clouds')
            classList[0].appendChild(clouds)
          }
        }
        else {

          console.log()

          let classList = document.getElementsByClassName('weatherAnimation')
          if (classList[0].children.length < 1) {
            const sun = document.createElement('div')
            sun.setAttribute('class', 'sun')
            classList[0].appendChild(sun)

            let sunClassList = document.getElementsByClassName('sun')

            if(window.innerWidth < 520){
              for (let i = 0; i < 9; i++) {
                let sunArays = document.createElement('div')
                sunArays.setAttribute('class', `sunAray sunAray-${i}`)
                sunClassList[0].appendChild(sunArays)
              }
            }
            // else{
            //   for (let i = 0; i < 16; i++) {
            //     let sunArays = document.createElement('div')
            //     sunArays.setAttribute('class', `sunAray sunAray-${i}`)
            //     sunClassList[0].appendChild(sunArays)
            //   }
            // }
            
          }

        }



      } catch (error) {
        console.error(error);
      }
    };


    getLocation();

  }, []);

  return (
    <div className='weatherWindow'>
      <div>
        <div className="rain front-row"></div>
        <div className='weatherAnimation'>
        </div>
        <div className='currentParams'>
          <div className='cityName'>{city}</div>
          <div className='additionalInfoWrapper'>
            <div className='additionalInfo'>
              <div className='currentInfo'>
                <div className='infoName'>
                  Temperature
                </div>
                <div className='infoParams'>
                  <div className='info'>
                    {temperature}c°
                  </div>
                  {temperature >= 20 ? (
                    <img src={hotTempLogo} alt="Hot temperature logo" />
                  ) : temperature < 0 ? (
                    <img src={coldTempLogo} alt="Cold temperature logo" />
                  ) : (
                    <img src={tempLogo} alt="Normal temperature logo" />
                  )}
                </div>
              </div>
            </div>
            <div className='additionalInfo'>
              <div className='currentInfo'>
                <div className='infoName'>
                  Wind speed
                </div>
                <div className='infoParams'>
                  <div className='info'>
                    {wind}m/s
                  </div>
                  <img src={windLogo} alt="Logo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IP;
