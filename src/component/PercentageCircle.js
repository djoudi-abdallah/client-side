import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios'; 

const PieChart = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/dashbord/circle');
        setSalesData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de vente', error);
      }
    };

    fetchSalesData();
  }, []);
  const backgroundColors = [
    'rgba(255, 99, 132, 0.2)', 
    'rgba(54, 162, 235, 0.2)',   
    'rgba(255, 206, 86, 0.2)',   
    'rgba(75, 192, 192, 0.2)',   
    'rgba(153, 102, 255, 0.2)',  

  ];
  
  const borderColors = [
    'rgba(255, 99, 132, 1)',  
    'rgba(54, 162, 235, 1)',   
    'rgba(255, 206, 86, 1)',  
    'rgba(75, 192, 192, 1)',   
    'rgba(153, 102, 255, 1)',  
    
  ];
  

  const chartData = {
    labels: salesData.map(item => item.centreCode),
    datasets: [
      {
        label: 'Total des ventes',
        data: salesData.map(item => item.totalSales),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false 
      }
    }
  };
  
  
  return (
    <div className="flex justify-center items-center w-[85%]">
      <Pie data={chartData} options={options} />
    </div>
  );
  
};
  export default PieChart;

