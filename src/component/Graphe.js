import { Line } from "react-chartjs-2";

const Graphe = ({ data }) => {
    // Assuming data is an object like { 2021: 120000, 2022: 150000, ... }
    const years = Object.keys(data);
    const sales = Object.values(data);
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Yearly Sales Data",
        },
      },
    };
  
    const chartData = {
      labels: years,
      datasets: [
        {
          label: "Total Sales",
          data: sales,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.5)",
        },
      ],
    };
  
    return <Line options={options} data={chartData} />;
  };
  
  export default Graphe;