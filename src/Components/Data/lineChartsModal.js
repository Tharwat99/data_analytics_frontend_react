import * as React from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';


export function LineChartsModal({data}) {
    const chartData = {
        labels: data.map(item => item.month),
        datasets: [
          {
            label: 'Profit Over Time',
            data: data.map(item => parseFloat(item.profit)),
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      };
    
      const options = {
        scales: {
          x: { stacked: true },
          y: { stacked: true },
        },
      };
    
      return <Line data={chartData} options={options} />;
    
};