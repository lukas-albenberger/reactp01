import React, {Component} from 'react';
import './App.css'
import keys from "./keys";
import NavBar from "./NavBar";

import { WeatherData } from './components/WeatherData';
import { StatusData } from './components/StatusData';

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'init',
      isLoaded: false,
      weatherData: null
    }
  }

  abortController = new AbortController();
  controllerSignal = this.abortController.signal;

  weatherInit = () => {

    const success = (position) => {
      this.setState({status: 'fetching'});
      localStorage.setItem('location-allowed', true);
      this.getWeatherData(position.coords.latitude, position.coords.longitude);
    }
  
    const error = () => {
      this.setState({status: 'unable'});
      localStorage.removeItem('location-allowed');
      alert('Unable to retrieve location.');
    }
  
    if (navigator.geolocation) {
      this.setState({status: 'fetching'});
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      this.setState({status: 'unsupported'});
      alert('Your browser does not support location tracking, or permission is denied.');
    }
  }

getWeatherData = (lat, lon) => {
  const weatherApi = `${api.base}weather?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`;
  
  fetch(weatherApi, { signal: this.controllerSignal })
  .then(res => res.json())
  .then(
    (result) => {

      console.log(result);

      const { name } = result;
      const { country } = result.sys;
      const { temp, temp_min, temp_max, feels_like, humidity } = result.main;
      const { description, icon } = result.weather[0];
      const { speed, deg } = result.wind;

      this.setState({
        status: 'success',
        isLoaded: true,
        weatherData: {
          name,
          country,
          description,
          icon,
          temp: temp.toFixed(1),
          feels_like: feels_like.toFixed(1),
          temp_min: temp_min.toFixed(1),
          temp_max: temp_max.toFixed(1),
          speed,
          deg,
          humidity
        }
      });
    },
    (error) => {
      this.setState({
        isLoaded: true,
        error
      });
    }
  );
}

componentDidMount() {
  if(localStorage.getItem('location-allowed')) {
   this.weatherInit();
  } else {
    return;
  }
}

componentWillUnmount() {
  this.abortController.abort();
}

returnActiveView = (status) => {
  switch(status) {
    case 'init':
      return(
        <button className='btn-main' onClick={this.onClick}
        >
          Get My Location
        </button>
      );
      case 'success':
      return <WeatherData data={this.state.weatherData} />;
      default:
        return <StatusData status={status} />;
  }
}

onClick = () => {
  this.weatherInit();
}

render() {
  return (
    <div><NavBar />
      <div className='App'>
        <div className='container'>
          {this.returnActiveView(this.state.status)}
        </div>
      </div>
    </div>
  );
}

}

export default App;