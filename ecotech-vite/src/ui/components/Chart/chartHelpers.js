const keyDisplayNameMapping = {
  // station
  emw_temperature: "Temperature",
  emw_humidity: "Humidity",
  emw_rain_lvl: "Rain Level",
  emw_avg_wind_speed: "Average Wind Speed",
  emw_gust_wind_speed: "Gust Wind Speed",
  emw_atm_pres: "Atmospheric Pressure",
  emw_wind_direction: "Wind Direction",
  emw_uv: "UV",
  emw_solar_radiation: "Solar Radiation",
  emw_luminosity: "Luminosity",
  internal_temperature: "Internal Temperature",
  internal_humidity: "Internal Humidity",
  // particles
  temperature: "Temperature",
  humidity: "Humidity",
  pm2_5: "PM2.5",
  noise: "Noise",
  voltage: "Voltage",
};
export const lineColors = [
  "#fa8072", // Salmon 1
  "#8dd1e1", // Sky blue 2
  "#76756d", // Light grey 3
  "#ff2121", // Watermelon 4
  "#ffc658", // Mustard 5
  "#ff69b4", // Hot pink 6
  "#8884d8", // Lavender 7
  "#a4de6c", // Light lime 8
  "#6a5acd", // Slate blue 9
  "#82ca9d", // Pale green 10
  "#ff7300", // Bright orange 11
  "#d0ed57", // Lemon 12
  "#b0c4de", // Light steel blue
  "#20b2aa", // Light sea green
  "#ff00ff", // Magenta
];

// Function to determine which keys to plot
export const getKeysToPlot = (dataObject) => {
  // Check if the data object contains a key 'emw_temperature'
  if (dataObject.emw_temperature !== undefined) {
    // If it does, filter and map the keys that start with 'emw_' or 'internal_'
    return Object.keys(dataObject)
      .filter((key) => key.startsWith("emw_") || key.startsWith("internal_"))
      .map((key) => ({
        key, // The actual key in the data object
        name: keyDisplayNameMapping[key] || key, // The display name from the mapping or the key itself if no mapping is found
      }));
  }
  // Check if the data object contains a key 'temperature'
  else if (dataObject.temperature !== undefined) {
    // If it does, map the specified keys to their display names
    return ["temperature", "humidity", "pm2_5", "noise", "voltage"].map(
      (key) => ({
        key, // The actual key in the data object
        name: keyDisplayNameMapping[key] || key, // The display name from the mapping or the key itself if no mapping is found
      })
    );
  }
  // If neither condition is met, return an empty array
  return [];
};

// Function to determine which keys to plot by default
export const getDefaultSelectedKeys = (dataObject) => {
  const keys = [];
  if (dataObject.emw_temperature !== undefined) {
    keys.push("emw_temperature", "emw_humidity");
  } else if (dataObject.temperature !== undefined) {
    keys.push("temperature", "humidity");
  }
  return keys;
};
