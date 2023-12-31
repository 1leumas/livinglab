export const formatDateAndTime = (dateString) => {
  const date = new Date(dateString);
  return `${date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })} at ${date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })}`;
};

export const formatChartDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};
