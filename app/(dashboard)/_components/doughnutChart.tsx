"use client";
import { useEffect } from "react";
import { Chart } from "chart.js";

// Define the props interface
interface DoughnutChartProps {
  labels: string[];
  data: number[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ labels, data }) => {
  useEffect(() => {
    const ctx = (document.getElementById("myChart") as HTMLCanvasElement).getContext("2d");

    if (!ctx) {
      return;
    }

    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            borderColor: [
              "rgb(75, 192, 192)",
              "rgb(255, 205, 86)",
              "rgb(255, 99, 132)",
            ],
            backgroundColor: [
              "rgb(75, 192, 192)",
              "rgb(255, 205, 86)",
              "rgb(255, 99, 132)",
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
      },
    });

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      myChart.destroy();
    };
  }, [labels, data]);

 
  return (
    <div className="border border-gray-400 pt-0 rounded-xl my-auto h-[300px]">
      <canvas id="myChart" width="300px" height="300px"></canvas>
    </div>
  );
};

export default DoughnutChart;
