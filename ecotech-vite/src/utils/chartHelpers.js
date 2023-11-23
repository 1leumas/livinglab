const keyDisplayNameMapping = {
  // station
  emw_temperature: { name: "Temperature", unit: "°C" },
  emw_humidity: { name: "Humidity", unit: "%" },
  emw_rain_lvl: { name: "Rain Level", unit: "mm" },
  emw_avg_wind_speed: { name: "Average Wind Speed", unit: "m/s" },
  emw_gust_wind_speed: { name: "Gust Wind Speed", unit: "m/s" },
  emw_atm_pres: { name: "Atmospheric Pressure", unit: "hPa" },
  emw_wind_direction: { name: "Wind Direction", unit: "°" },
  emw_uv: { name: "UV", unit: "" },
  emw_solar_radiation: { name: "Solar Radiation", unit: "W/m²" },
  emw_luminosity: { name: "Luminosity", unit: "lux" },
  internal_temperature: { name: "Internal Temperature", unit: "°C" },
  internal_humidity: { name: "Internal Humidity", unit: "%" },
  // particles
  temperature: { name: "Temperature", unit: "°C" },
  humidity: { name: "Humidity", unit: "%" },
  pm2_5: { name: "PM2.5", unit: "µg/m³" },
  noise: { name: "Noise", unit: "dB" },
  voltage: { name: "Voltage", unit: "V" },
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

export const getKeysToPlot = (dataObject) => {
  // Check if the data object contains a key 'emw_temperature'
  if (dataObject.emw_temperature !== undefined) {
    // If it does, filter and map the keys that start with 'emw_' or 'internal_'
    return Object.keys(dataObject)
      .filter((key) => key.startsWith("emw_") || key.startsWith("internal_"))
      .map((key) => ({
        key, // The actual key in the data object
        name: keyDisplayNameMapping[key]?.name || key, // The display name from the mapping or the key itself if no mapping is found
        unit: keyDisplayNameMapping[key]?.unit || "", // The unit from the mapping or an empty string if no unit is found
      }));
  }
  // Check if the data object contains a key 'temperature'
  else if (dataObject.temperature !== undefined) {
    // If it does, map the specified keys to their display names
    return ["temperature", "humidity", "pm2_5", "noise", "voltage"].map(
      (key) => ({
        key, // The actual key in the data object
        name: keyDisplayNameMapping[key]?.name || key, // The display name from the mapping or the key itself if no mapping is found
        unit: keyDisplayNameMapping[key]?.unit || "", // The unit from the mapping or an empty string if no unit is found
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
    keys.push("emw_temperature", "emw_humidity", "temperature", "humidity");
  }
  return keys;
};