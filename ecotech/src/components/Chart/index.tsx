import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Station, Particles } from "../../interfaces/weather";
import { dateFormatter, normalizeData } from "./helpers";
import { CustomTooltip } from "./CustomTooltip";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

interface ChartProps {
  data: (Particles | Station)[];
}

export default function Chart({ data }: ChartProps) {
  const normalizedData = data.map(normalizeData);

  // filtrar para nao aparecer time e dispositivo nas checkbox
  const dataKeys = Object.keys(normalizedData[0] ?? {}).filter(
    (key) => key !== "time" && key !== "Dispositivo",
  );

  const [selectedKeys, setSelectedKeys] = useState<string[]>(dataKeys);

  const handleCheckboxChange = (key: string) => {
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  //gerar cada area do grafico
  const areaComponents = selectedKeys.map((key) => (
    <Area key={key} dataKey={key} stroke="#2451B7" fillOpacity={0.3} />
  ));

  //gerar cada checkbox
  const checkboxes = dataKeys.map((key) => (
    <FormControlLabel
      key={key}
      control={
        <Checkbox
          checked={selectedKeys.includes(key)}
          onChange={() => handleCheckboxChange(key)}
        />
      }
      label={key}
    />
  ));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ marginBottom: "20px" }}>{checkboxes}</div>

      <ResponsiveContainer width={1250} height={300}>
        <AreaChart data={normalizedData}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2451B7" stopOpacity={0.5} />
              <stop offset="85%" stopColor="#2451B7" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          {areaComponents}

          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tickFormatter={dateFormatter}
          />
          <YAxis axisLine={false} />

          <Tooltip content={<CustomTooltip />} />

          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
