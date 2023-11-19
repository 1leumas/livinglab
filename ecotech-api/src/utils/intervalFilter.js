function filterByInterval(data, interval) {
  if (!interval || interval === "all") return data;

  const intervalInHours = parseInt(interval.replace("h", ""), 10);
  const intervalInMillis = intervalInHours * 60 * 60 * 1000;

  return data.reduce((filtered, current) => {
    const currentTime = new Date(current.time).getTime();
    const lastTime =
      filtered.length > 0
        ? new Date(filtered[filtered.length - 1].time).getTime()
        : 0;

    if (currentTime - lastTime >= intervalInMillis || lastTime === 0) {
      filtered.push(current);
    }

    return filtered;
  }, []);
}

module.exports = { filterByInterval };
