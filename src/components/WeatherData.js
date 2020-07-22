import React from 'react'

import { Month, Weekday, Day, DegreesToDirection } from '../helpers/utils'
import { Clock } from './Clock'

export const WeatherData = ({ data }) => {
    const { name, country, temp, description, temp_min, temp_max, icon, feels_like, speed, deg, humidity } = data;

    return ( 
        <>
            <header>
                <div>
                    <img src={require(`../img/clock.png`)} alt='time icon'/>
                    <Clock />
                </div>
                <h5>{Weekday}, {Month} {Day}</h5>
            </header>
            <main>
                <div className='weather-main'>
                    <img
                    src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='weather icon'
                    className='weather-icon'/>
                    <div>
                        <h2>{name}, {country}</h2>
                        <h3 className='description'>{description}</h3>
                    </div>
                </div>
                <div className='temp-main'>
                    <h5>Feels like {feels_like}</h5>
                    <h1 className='temperature'>{temp}°</h1>
                    <div className='hi-lo'>
                        <h5>H {temp_max}</h5>
                        <h5>L {temp_min}</h5>
                    </div>
                </div>
            </main>
            <foot>
                <div className='weather-prop'>
                    <img src={require('../img/wind.png')} alt=''/>
                    <h4>{DegreesToDirection(deg)} {speed} KPH</h4>
                </div>
                <div className='weather-prop'>
                    <img src={require('../img/drop.png')} alt=''/>
                    <h4>{humidity}%</h4>
                </div>
            </foot>
        </>
    );
}