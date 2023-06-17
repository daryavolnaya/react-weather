import React, { useState } from "react";
import "./SearchEngine.css"
import axios from "axios";

export default function SearchEngine() {
  let [city, setCity] = useState("");
  let [result, setResult] = useState(false);
  let [weather, setWeather] = useState("{}");

  function showTemperature(response) {
    setResult(true);

    setWeather({
      description: response.data.weather[0].description,
      temperature: Math.round(response.data.main.temp),
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    });
  }
  function handleSearch(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=96ad27349a64ea1dcdfbe6f4d458c085&&units=metric`;
    axios.get(url).then(showTemperature);
  }
  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }
  let form = (
    <form onSubmit={handleSearch}>
      <input
        type="search"
        placeholder="Search for a city"
        onChange={updateCity}
      />

      <button type="submit">Search</button>
    </form>
  );

  if (result) {
    return (
      <div>
        {form}
        <ul>
          <li>{city}</li>
          <li>Description: {weather.description}</li>
          <li>Temperature: {weather.temperature}ºC</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind} m/s</li>
          <li>
            {" "}
            <img src={weather.icon} alt="weather" />
          </li>
        </ul>
      </div>
    );
  } else {
    return <div>
        {form}
        <ul>
          <li>Barcelona</li>
          <li>Description: rainy</li>
          <li>Temperature: 22ºC</li>
          <li>Humidity: 84%</li>
          <li>Wind: 2 m/s</li>
          <li>
            {" "}
            <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="weather" />
          </li>
        </ul>
      </div>
  }
}
