import PropTypes from "prop-types";
import { DataCardContainer } from "./styles";

export const DataCard = ({ name, peakValue, unit }) => (
  <DataCardContainer>
    <h3>{name}</h3>
    <p>
      {peakValue} {unit}
    </p>
  </DataCardContainer>
);

DataCard.propTypes = {
  name: PropTypes.string.isRequired,
  peakValue: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
};
