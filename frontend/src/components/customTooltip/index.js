import React from 'react';
import { CustomTooltipContainer } from './styles';

const CustomTooltip = ({ active, payload, selectedMetrics }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <CustomTooltipContainer>
        <p className="label">{`Time: ${data.time}`}</p>
        <p className="label">{`Device: ${data.device}`}</p>
        {selectedMetrics.temperature && <p className="label">{`Temperature: ${data.temperature} °C`}</p>}
        {selectedMetrics.humidity && <p className="label">{`Humidity: ${data.humidity} %`}</p>}
        {selectedMetrics.rain_lvl && <p className="label">{`Rain Level: ${data.rain_lvl} mm`}</p>}
        {selectedMetrics.wind_speed && <p className="label">{`Wind Speed: ${data.wind_speed} km/h`}</p>}
        {selectedMetrics.pressure && <p className="label">{`Pressure: ${data.pressure} hPa`}</p>}
        {selectedMetrics.uv && <p className="label">{`UV: ${data.uv}`}</p>}
        {selectedMetrics.solar_radiation && <p className="label">{`Solar Radiation: ${data.solar_radiation} W/m²`}</p>}
        {selectedMetrics.luminosity && <p className="label">{`Luminosity: ${data.luminosity} lux`}</p>}
      </CustomTooltipContainer>
    );
  }
  return null;
};

export default CustomTooltip;