import React from "react";
import { CustomTooltipContainer } from "./styles";

const CustomTooltip = ({ active, payload, selectedMetrics }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    const metricUnits = {
      temperature: " °C",
      humidity: " %",
      rain_lvl: " mm",
      wind_speed: " km/h",
      pressure: " hPa",
      uv: " ",
      solar_radiation: " W/m²",
      luminosity: " lux",
      noise: " dB",
      voltage: " V",
    };

    return (
      <CustomTooltipContainer>
        <p className="label">{`Time: ${data.time}`}</p>
        <p className="label">{`Device: ${data.device}`}</p>
        {Object.entries(selectedMetrics).map(
          ([metric, isSelected]) =>
            isSelected && (
              <p key={metric} className="label">
                {`${capitalizeFirstLetter(metric)}: ${data[metric]}${metricUnits[metric]}`}
              </p>
            )
        )}
      </CustomTooltipContainer>
    );
  }

  return null;
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default CustomTooltip;
