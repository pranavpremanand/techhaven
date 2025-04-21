"use client";
import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FiBarChart2 } from "react-icons/fi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const SalesGraph = ({ graphData }) => {
  const [activeRange, setActiveRange] = useState("12");
  const [chartData, setChartData] = useState(null);

  // Process the data based on the selected range
  useEffect(() => {
    if (!graphData) return;

    const prepareChartData = () => {
      let dataToUse = [];
      let labels = [];

      switch (activeRange) {
        case "7d":
          dataToUse = graphData.last7Days;
          labels = dataToUse.map((item) => item.dateLabel);
          break;
        case "30d":
          dataToUse = graphData.last30Days;
          // For 30 days, we might want to show every 5th day for better readability
          labels = dataToUse.map((item, index) =>
            index % 5 === 0 ? item.dateLabel : ""
          );
          break;
        case "12":
          dataToUse = graphData.last12Months;
          labels = dataToUse.map((item) => item.dateLabel);
          break;
        default:
          dataToUse = graphData.last7Days;
      }

      return {
        labels,
        datasets: [
          {
            fill: true,
            label: "Sales",
            data: dataToUse.map((item) => item.sales),
            borderColor: "#568fad",
            borderWidth: 2,
            backgroundColor: "rgb(114, 150, 168, 0.3)",
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 5,
            pointBackgroundColor: "#568fad",
          },
          {
            label: "Orders",
            data: dataToUse.map((item) => item.orders * 100), // Scale orders to match sales visually
            borderColor: "#8a6ea8",
            borderWidth: 2,
            backgroundColor: "transparent",
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 5,
            pointBackgroundColor: "#8a6ea8",
            yAxisID: "y1",
          },
        ],
      };
    };

    setChartData(prepareChartData());
  }, [activeRange, graphData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            let value = context.parsed.y;
            if (label === "Orders") {
              value = value / 100; // Reverse the scaling for display
              return `${label}: ${value}`;
            }
            return `${label}: ₹${value.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#9CA3AF",
        },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Sales (₹)",
        },
        grid: {
          color: "rgba(156, 163, 175, 0.1)",
        },
        ticks: {
          color: "#9CA3AF",
          callback: (value) => `₹${value.toLocaleString()}`,
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Orders",
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: "#8a6ea8",
          callback: (value) => String(value / 100).slice(0,4), // Reverse the scaling for display
        },
      },
    },
  };

  return (
    <div className="bg-white text-black p-4 rounded-lg shadow">
      <div className="flex sm:flex-row flex-col gap-4 justify-between items-center mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <FiBarChart2 className="mr-2 text-primary" /> Sales Overview
        </h2>
        <div className="flex space-x-2">
          {["7d", "30d", "12"].map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`px-3 py-1 text-sm rounded-md ${
                activeRange === range
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {range === "7d"
                ? "7 Days"
                : range === "30d"
                ? "30 Days"
                : "12 Months"}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 w-full">
        {chartData ? (
          <Line options={options} data={chartData} />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Loading chart...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesGraph;
