import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line, Doughnut } from "react-chartjs-2";
import data from "../data/data.json";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

const TabThree = () => {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Expenses",
        data: data.map((item) => item.amount),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.4, // Smooth curve for the Line chart
      },
    ],
  };

  const doughnutData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Expenses",
        data: data.map((item) => item.amount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Expenses",
        font: {
          size: 20,
        },
      },
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="w-full h-[400px]">
        <Line data={chartData} options={options} />
      </div>
      <div className="w-full h-[400px]">
        <Doughnut data={doughnutData} options={options} />
      </div>
    </div>
  );
};

export default TabThree;
