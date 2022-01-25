import React, { useState } from 'react';

const api = {
  key: `${process.env.REACT_APP_API_KEY}`,
  base: 'https://api.openweathermap.org/data/2.5/'
}


function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if (e.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}&lang=tr`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          // console.log(result);
        }
        )
    }
  }

  const dateBuild = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }


  return (
    <div className={(typeof weather.main !== 'undefined') ?
      ((weather.main.temp > 25) ? 'App hot' :
      ((weather.main.temp < 25 && weather.main.temp > 5) ?
       'App warm' : 'App cold')) : 'App'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search for a location..."
            onChange={e => setQuery(e.target.value)}
            onKeyPress={search}
            value={query}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date"> {dateBuild(new Date())}
              </div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon.slice(0,2)}d.png`}
                  alt='weather'
                  width={80}
                  height={80}
                />
              </div>
              <div className="weather">
                <p>
                  <span>Hissedilen</span>
                  {Math.floor(weather.main.feels_like)} °C
                </p>
                <p>
                  <span>Şu an</span>
                  {weather.weather[0].description}
                </p>
                <p>
                  <span>Basınç</span>
                  {weather.main.pressure} mb
                </p>
                <p>
                  <span>Rüzgar </span>
                   {Math.floor(weather.wind.speed)} km/h
                </p>
                <p>
                  <span>En fazla</span>
                  {Math.floor(weather.main.temp_max)} °C
                </p>
                <p>
                  <span>En az</span>
                  {Math.floor(weather.main.temp_min)} °C
                </p>
              </div>
            </div>
          </div>) : ('')}
      </main>
    </div>
  );
}

export default App;
