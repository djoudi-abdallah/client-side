import React, { useState, useEffect, useRef } from 'react';
import Chart from "chart.js/auto";
import axios from 'axios';
import { useLocation } from "react-router-dom";

const PieChart = () => {
  const chartRef = useRef(null);
  const [salesData, setSalesData] = useState([]);
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const fetchSalesmontant = async () => {
      
      try {
        const response = await axios.get(
          `http://localhost:3001/dashbord/circle`
        );
        setSalesData(response.data.totalSales);
        setProducts(response.data.centreCodes);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchSalesmontant();
  }, []);

  useEffect(() => {
    if (products.length && salesData.length) {
      const ctx = chartRef.current.getContext("2d");

      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      chartRef.current.chart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: products,
          datasets: [
            {
              data: salesData,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
      });
    }
  }, [salesData, products]);

  return (
    <div style={{ width: "100%" }}>
      <canvas id="pieChart" ref={chartRef}></canvas>
    </div>
  );
};

export default PieChart;