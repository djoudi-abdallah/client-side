
import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Total Monthly Revenue",
      data: [500, 1000, 1500, 2000, 2500, 3500, 4000, 3000, 2000, 1500, 1200, 800], // Replace with your data
      backgroundColor: "orange",
      borderRadius: 10,
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (value) {
          return value >= 1000 ? `${value / 1000}k` : value;
        },
        font: {
          size: 20,
        },
      },
    },
    x: {
      ticks: {
        font: {
          size: 20,
        },
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        font: {
          size: 24,
        },
      },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || "";
          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label +=
              context.parsed.y >= 1000
                ? `${context.parsed.y / 1000}k`
                : context.parsed.y;
          }
          return label;
        },
      },
      bodyFont: {
        size: 16,
      },
    },
  },
  maintainAspectRatio: false,
};

const LineChart = () => (
  <div style={{ height: "300px", width: "90%" , padding : "12px"}}>
    <Bar data={data} options={options} />
  </div>
);

export default LineChart;
