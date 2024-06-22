"use client";
import { useEffect } from "react";
import { Chart } from "chart.js";

function DoughnutChart({ labels, data }) {
  useEffect(() => {
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
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
              "rgb(75, 192, 192 )",
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
    <>
      {/* line chart */}
      <div className="border border-gray-400 pt-0 rounded-xl   my-auto h-[300px]">
        <canvas id="myChart" width="300px" height="300px"></canvas>
      </div>
    </>
  );
}

export default DoughnutChart;
