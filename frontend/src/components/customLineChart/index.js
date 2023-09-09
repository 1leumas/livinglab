import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
} from "recharts";
import CustomTooltip from "../customTooltip";

const CustomYAxisTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={5}
          textAnchor="end"
          fill="#FFFFFF"
          fontSize={12}
          fontFamily="Arial"
        >
          {payload.value}
        </text>
      </g>
    );
  };

const CustomLineChart = ({ data, selectedMetrics, strokeColors }) => {
  return (
    <LineChart width={1100} height={300} data={data}>
      <XAxis dataKey="time" hide={true}/>
      <YAxis tick={<CustomYAxisTick />}/>
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip content={<CustomTooltip selectedMetrics={selectedMetrics} />} />
      <Brush dataKey="time" height={30} stroke="gray" />
      <Legend />

      {Object.keys(selectedMetrics).map((metric, index) => {
        if (selectedMetrics[metric]) {
          return (
            <Line
              key={metric}
              type="monotone"
              dataKey={metric}
              stroke={strokeColors[index]}
              dot={false}
            />
          );
        }
        return null;
      })}
    </LineChart>
  );
};

export default CustomLineChart;
