import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";

const LineChart = () => {
  const [chartData, setChartData] = useState({
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
        data: [], // Initialize with an empty array
        backgroundColor: "orange",
        borderRadius: 10,
      },
    ],
  });

  useEffect(() => {
    // Fetch data from the backend API
    axios
      .get("http://localhost:3001/dashbord/monhana")
      .then((response) => {
        // Extract the data you need from the response and update the chartData state
        const monthlyData = response.data;
        setChartData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: monthlyData,
            },
          ],
        }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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

  return (
    <div style={{ height: "300px", width: "90%", padding: "12px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
