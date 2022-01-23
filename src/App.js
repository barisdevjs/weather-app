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
          console.log(result);
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
      ((weather.main.temp > 20) ? 'App warm' : 'App') : 'App'}>
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
              </div>
              <div className="weather">
                <p>
                  {weather.weather[0].description}
                </p>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt='weather'
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>) : ('')}
      </main>
    </div>
  );
}

export default App;
