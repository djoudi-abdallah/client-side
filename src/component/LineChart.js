import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const LineChart = ({ idShop }) => {
  const chartRef = useRef(null);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSalesmontant = async () => {
   
        try {
          const response = await axios.get(
            `http://localhost:3001/dashbord/monhana`
          );
          console.log("response", response.data);
          if (Array.isArray(response.data)) {
            setSalesData(response.data);
          } else {
            console.error("Expected an array, received:", typeof response.data);
          }
        } catch (error) {
          console.error("Error fetching:", error);
        }
     
    };
    fetchSalesmontant();
  }, []);

  useEffect(() => {
    if (!chartRef.current) return; // Check if the ref is defined

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const ctx = chartRef.current.getContext("2d");

    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    chartRef.current.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: months,
        datasets: [
          {
            label: idShop ? "Profit in USD" : "purchase in USD",
            data: salesData,
            fill: false,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Add this line
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: idShop ? "Profit in USD" : "purchase in USD",
            },
          },
        },
      },
    });
  }, [salesData]); // Add salesData to the dependency array

  return (
    <div style={{ height: "auto" }}>
      <canvas
        id="lineChart"
        ref={chartRef}
        style={{ width: "100%", height: "200px" }}
      ></canvas>
    </div>
  );
};

export default LineChart;