export interface Particles {
  deviceName: string;
  temperature: number;
  humidity: number;
  noise: number;
  voltage: number;
  time: string;
  pm2_5: number;
}

export interface Station {
  emw_rain_lvl: number;
  emw_avg_wind_speed: number;
  emw_gust_wind_speed: number;
  emw_wind_direction: number;
  emw_temperature: number;
  emw_humidity: number;
  emw_luminosity: string;
  emw_uv: number;
  emw_solar_radiation: number;
  emw_atm_pres: number;
  internal_temperature: number;
  internal_humidity: number;
  time: string;
  deviceName: string;
}
