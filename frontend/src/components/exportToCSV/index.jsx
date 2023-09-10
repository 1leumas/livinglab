import React from "react";
import PropTypes from "prop-types";
import Button from "../button";

const ExportToCSV = ({ data, fileName }) => {
  const exportToCSV = () => {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));
    for (const row of data) {
      const values = headers.map((header) => {
        const escaped = ("" + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const link = document.createElement("a");
    link.download = fileName;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return <Button onClick={exportToCSV}>Export to CSV</Button>;
};

ExportToCSV.propTypes = {
  data: PropTypes.array.isRequired,
  fileName: PropTypes.string,
};

ExportToCSV.defaultProps = {
  fileName: "exported_data.csv",
};

export default ExportToCSV;
