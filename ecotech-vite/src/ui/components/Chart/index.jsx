import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import PropTypes from "prop-types";
import { useState } from "react";
import { ChartContainer, CheckboxContainer, CheckBox } from "./styles";
import CustomTooltip from "./CustomTooltip";
import {
  lineColors,
  getKeysToPlot,
  getDefaultSelectedKeys,
} from "../../../utils/chartHelpers";
import { formatChartDate } from "../../../utils/dateFormatter";

const Chart = ({ data }) => {
  const [selectedKeys, setSelectedKeys] = useState(
    data && data.length > 0 ? getDefaultSelectedKeys(data[0]) : []
  );

  //console.log(selectedKeys)

  // checkbox change handler
  const handleCheckboxChange = (key) => {
    setSelectedKeys((prevSelectedKeys) =>
      prevSelectedKeys.includes(key)
        ? prevSelectedKeys.filter((k) => k !== key)
        : [...prevSelectedKeys, key]
    );
  };

  // render checkboxes for each key
  const renderCheckboxes = () => {
    return keysToPlot.map(({ key, name }) => (
      <label key={key}>
        <CheckBox
          type="checkbox"
          checked={selectedKeys.includes(key)}
          onChange={() => handleCheckboxChange(key)}
        />
        {name}
      </label>
    ));
  };

  const keysToPlot = data.length > 0 ? getKeysToPlot(data[0]) : [];
  //console.log(keysToPlot);

  return (
    <ChartContainer>
      <CheckboxContainer>{renderCheckboxes()}</CheckboxContainer>
      <ResponsiveContainer width="70%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          {keysToPlot.map(
            ({ key, name }, index) =>
              selectedKeys.includes(key) && (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  name={name}
                  stroke={lineColors[index % lineColors.length]}
                  dot={false}
                  strokeWidth={3}
                />
              )
          )}
          <CartesianGrid stroke="#233554" strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            stroke="#000000"
            tickFormatter={formatChartDate}
          />
          <YAxis stroke="#000000" />
          <Tooltip
            wrapperStyle={{
              backgroundColor: "#ffffff",
              border: "none",
              borderRadius: "5px",
            }}
            itemStyle={{ color: "#ffffff" }}
            labelStyle={{ color: "#ffffff" }}
            content={<CustomTooltip keysToPlot={keysToPlot} />}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default Chart;

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
