import PropTypes from "prop-types";
import { TooltipContainer } from "./styles.js";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <TooltipContainer>
        <p>{`Date: ${new Date(label).toLocaleDateString()}`}</p>
        <p>{`Time: ${new Date(label).toLocaleTimeString()}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
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
};
