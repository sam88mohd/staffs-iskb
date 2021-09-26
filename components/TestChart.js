import React from "react";
import Chart from "react-google-charts";

const TestChart = () => {
  return (
    <Chart
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      spreadSheetUrl="https://docs.google.com/spreadsheets/d/18rmN_uC81y8UG5-Jtkvmxf3k6uPxGmRYfCMkHz9OaAQ"
      spreadSheetQueryParameters={{
        headers: 1,
        query: "SELECT B, C, D, E, F",
      }}
      options={{
        // hAxis: {
        // format:'short'
        // },
        vAxis: {
          format: "long",
        },
      }}
    />
  );
};

export default TestChart;
