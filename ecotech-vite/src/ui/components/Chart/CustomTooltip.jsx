import PropTypes from "prop-types";
import { TooltipContainer } from "./styles.js";

const CustomTooltip = ({ active, payload, label, keysToPlot }) => {
  if (active && payload && payload.length) {
    return (
      <TooltipContainer>
        <p>{`Date: ${new Date(label).toLocaleDateString()}`}</p>
        <p>{`Time: ${new Date(label).toLocaleTimeString()}`}</p>
        {payload.map((entry, index) => {
          const unit =
            keysToPlot.find((k) => k.key === entry.dataKey)?.unit || "";
          return (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value} ${unit}`}
            </p>
          );
        })}
      </TooltipContainer>
    );
  }
  return null;
};

export default CustomTooltip;

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
  keysToPlot: PropTypes.arrayOf(PropTypes.object), // Update PropTypes
};
