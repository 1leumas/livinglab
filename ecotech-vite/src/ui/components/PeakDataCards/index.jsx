import { getKeysToPlot } from "../../../utils/chartHelpers";
import PropTypes from "prop-types";
import { DataCard } from "./DataCard";
import { calculatePeakValues } from "../../../utils/peakValueHelpers";
import { PeakDataCardContainer } from "./styles";

const PeakDataCards = ({ data }) => {
  if (!data || data.length === 0) return <p>No data available</p>;

  const keysToPlot = getKeysToPlot(data[0]);
  const peakValues = calculatePeakValues(data, keysToPlot);

  //console.log(peakValues);

  return (
    <PeakDataCardContainer>
      {keysToPlot.map(({ key, name, unit }) => (
        <DataCard
          key={key}
          name={name}
          peakValue={peakValues[key]}
          unit={unit}
        />
      ))}
    </PeakDataCardContainer>
  );
};

export default PeakDataCards;

PeakDataCards.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
