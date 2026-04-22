export const getWeather = async (req, res) => {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=28.6&longitude=77.2&current_weather=true"
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching weather" });
  }
};
