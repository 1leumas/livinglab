export const getPeakValues = (datasets) => {
  return datasets.map((dataset) => {
    const peakValue = Math.max(...dataset.data);
    return {
      label: dataset.label,
      peakValue: peakValue,
    };
  });
};

export const getUnitForLabel = (label) => {
  switch (label) {
    case "Temperature":
      return "°C";
    case "Humidity":
      return "%";
    case "Atmospheric Pressure":
      return "hPa";
    case "UV":
      return "Index";
    case "Luminosity":
      return "lx";
    case "Rain Level":
      return "mm";
    case "Average Wind Speed":
      return "km/h";
    case "Gust Wind Speed":
      return "km/h";
    case "Solar Radiation":
      return "W/m²";
    case "Internal Temperature":
      return "°C";
    case "Internal Humidity":
      return "%";
    case "Noise":
      return "dB";
    case "Voltage":
      return "V";
    case "PM2.5":
      return "μg/m³";
    default:
      return "";
  }
};
