/**
 * This module contains a function to filter a dataset based on a specified time interval.
 * The function assumes that the data is in chronological order and that each data point has a 'time' field.
 */

// Define the structure of a data point, which must include a time string and can have any number of additional properties.
interface DataPoint {
  time: string;
  [key: string]: any; // This allows the object to have other properties as well.
}

/**
 * Filters an array of data to retain only the data points that are within specific time intervals.
 *
 * @param {DataPoint[]} data - An array of objects representing the data. Each object must have a 'time' field which is a date-time string.
 * @param {string} interval - A string representing the time interval for filtering. Should be in the format 'Xh', where X is the number of hours.
 * @returns {DataPoint[]} An array of filtered objects, retaining only the data points that are within the specified time interval.
 */
const filterByInterval = (data: DataPoint[], interval: string): DataPoint[] => {
  // If the interval is not specified or is 'all', return all data without filtering.
  if (!interval || interval === "all") return data;

  // Convert the interval string to a number of hours, then to milliseconds.
  const intervalInHours = parseInt(interval.replace("h", ""), 10);
  const intervalInMillis = intervalInHours * 60 * 60 * 1000;

  // Reduce the data array to retain only the data points that are within the time interval.
  return data.reduce((filtered: DataPoint[], current: DataPoint) => {
    const currentTime = new Date(current.time).getTime();
    const lastTime =
      filtered.length > 0
        ? new Date(filtered[filtered.length - 1].time).getTime()
        : 0;

    // If the current data point is within the specified time interval from the last retained data point, add it to the filtered array.
    if (currentTime - lastTime >= intervalInMillis || lastTime === 0) {
      filtered.push(current);
    }

    return filtered;
  }, []);
};

export { filterByInterval };
