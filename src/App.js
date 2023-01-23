import React, { useEffect, useState } from 'react';
import Chart1 from './Chart';

const api = {
  key: process.env.REACT_APP_API_KEY,
  base: 'https://api.openweathermap.org/data/2.5/',
  base2: 'https://api.openweathermap.org/data/3.0/'
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState({ lat: '', lon: '' });
  const [following, setFollowing] = useState([]);



  const search = async (e) => {
    if (e.key === 'Enter') {
      await fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}&lang=tr`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setLocation(result.coord);
          setQuery('');
          searchFollowing();
        }
        )
      }
  }



  
  const searchFollowing = async () => {
    if (location.lat && location.lon) {
      await fetch(`${api.base2}onecall?lat=${location.lat}&lon=${location.lon}&units=metric&exclude=hourly,minutely&appid=${api.key}`)
      .then(res => res.json())
      .then(result2 => {
        const array = result2.daily.slice(1, 6);
        setFollowing(array);
      }
      )
    }
  }
  
  useEffect(() => {
   if (location?.lat && location?.lon) {
     searchFollowing();
   }
   // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [location])


  const integer = (number) => {
    return Math.floor(Math.round(number));
  }


  const mapped = (following) => {
    following = [...following];
    return following.map((item, idx) => {
      const date = new Date(item.dt * 1000);
      const date1 = date.toLocaleString('default', { weekday: 'long' });
      const icon = item.weather[0].icon;
      const day = integer(item.temp.day);
      const night = integer(item.temp.night);
      return (
        <div key={idx} className="box">
          <h4>{date1}</h4>
          <img
            src={`http://openweathermap.org/img/wn/${icon}.png`}
            alt='weather'
            width={100}
            height={100}
          />
          <h4>Gündüz &nbsp; &nbsp; {day} °C</h4>
          <h4>Gece &nbsp; &nbsp; {night} °C</h4>
        </div>
      )
    })
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
          'App warm' : 'App')) : 'App'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search for a location..."
            onChange={e => setQuery(e.target.value)}
            onKeyDown={search}
            value={query}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div className="content">
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
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon.slice(0, 2)}d.png`}
                  alt='weather'
                  width={150}
                  height={150}
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
            <Chart1 following={following} />
            <div className="followingdays"
            >
              {mapped(following)}
            </div>
          </div>) : ('')}
      </main>
    </div>
  );
}

export default App;