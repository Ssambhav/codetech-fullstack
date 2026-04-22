import { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [data, setData] = useState(null);

  const fetchWeather = async () => {
    const res = await axios.get("/api/weather");
    setData(res.data.current_weather);
  };

  return (
    <div>
      <h2>🌦 Weather</h2>
      <button onClick={fetchWeather}>Fetch Weather</button>

      {data && (
        <>
          <p>Temperature: {data.temperature}°C</p>
          <p>Wind Speed: {data.windspeed}</p>
        </>
      )}
    </div>
  );
}
