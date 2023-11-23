export const calculatePeakValues = (data, keys) => {
  const peakValues = {};
  keys.forEach(({ key }) => {
    peakValues[key] = Math.max(...data.map((item) => item[key]));
  });
  return peakValues;
};
