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
import { ChartContainer, CheckboxContainer } from "./styles";
import CustomTooltip from "./CustomTooltip";
import {
  lineColors,
  getKeysToPlot,
  getDefaultSelectedKeys,
} from "./chartHelpers";
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
        <input
          type="checkbox"
          checked={selectedKeys.includes(key)}
          onChange={() => handleCheckboxChange(key)}
        />
        {name}
      </label>
    ));
  };

  const keysToPlot = data.length > 0 ? getKeysToPlot(data[0]) : [];
  // console.log(keysToPlot);

  return (
    <ChartContainer>
      <CheckboxContainer>{renderCheckboxes()}</CheckboxContainer>
      <ResponsiveContainer width="75%" height={350}>
        <LineChart data={data}>
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
                />
              )
          )}
          <CartesianGrid stroke="#aeaeae" />
          <XAxis dataKey="time" tickFormatter={formatChartDate} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default Chart;

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
