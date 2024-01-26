import * as React from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';


export function BarChartsModal({data}) {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Revenue',
        data: data.map(item => parseFloat(item.revenue)),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: data.map(item => parseFloat(item.expenses)),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Profit',
        data: data.map(item => parseFloat(item.profit)),
        backgroundColor: 'rgba(255, 205, 86, 0.2)',
        borderColor: 'rgba(255, 205, 86, 1)',
        borderWidth: 1,
      },
    ],
  };

const options = {
  scales: {
    x: { stacked: true },
    y: { stacked: true },
  },
};
return <Bar data={chartData} options={options} />;
};