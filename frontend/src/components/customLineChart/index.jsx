import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
} from 'recharts';
import CustomTooltip from '../customTooltip';
import styled from 'styled-components';

// estilo para o wrap de gráfico e insights
const ChartAndInsightsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  //border: 1px solid #fff;
`;

// cartao insights
const InsightsCard = styled.div`
  width: 275px;
  padding: 10px;
  height: 250px;
  margin-left: 5px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

// estilo para o tick do eixo Y
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

// componente de gráfico
const CustomLineChart = ({ data, selectedMetrics, strokeColors }) => {
  // Calcular o valor máximo e mínimo para cada métrica selecionada
  const insights = {};
  for (const metric in selectedMetrics) {
    if (selectedMetrics[metric]) {
      const values = data.map((item) => item[metric]);
      const max = Math.max(...values);
      const min = Math.min(...values);
      insights[metric] = { max, min };
    }
  }

  return (
    <ChartAndInsightsContainer>
      {/* Gráfico */}
      <LineChart width={800} height={300} data={data}>
        <XAxis dataKey="time" hide={true} />
        <YAxis tick={<CustomYAxisTick />} />
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

      {/* Cartão de Insights */}
      <InsightsCard>
        <h3>Max | Min</h3>
        {Object.keys(insights).map((metric, index) => (
          <div key={index}>
            <strong>{metric}</strong>: Max = {insights[metric].max}, Min = {insights[metric].min}
          </div>
        ))}
      </InsightsCard>
    </ChartAndInsightsContainer>
  );
};

export default CustomLineChart;
