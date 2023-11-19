import { Particles, Station } from "../../interfaces/weather";

export function normalizeData(item: Particles | Station) {
  return {
    //both
    Dispositivo: item.deviceName,
    time: item.time,
    Temperatura:
      "temperature" in item ? item.temperature : item.emw_temperature,
    Humidade: "humidity" in item ? item.humidity : item.emw_humidity,
    //particles
    Barulho: "noise" in item ? item.noise : null,
    Voltagem: "voltage" in item ? item.voltage : null,
    "pm2.5": "pm2_5" in item ? item.pm2_5 : null,
    //station
  };
}

// Date formatter for the XAxis
export function dateFormatter(str?: string) {
  if (!str) return "No Date";

  const date = new Date(str);
  return `${date.getDate()}/${date.getMonth() + 1} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}
