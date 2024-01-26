import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: 'bottom',
      },
      plugins: {
        title: {
          display: true,
          text: 'Profit per Month',
          fontSize: 16,
        },
      },
    };

    const myChart = new Chart(chartRef.current, {
      type: 'pie',
      data: {
        labels: data.map(item => item.month),
        datasets: [{
          data: data.map(item => parseFloat(item.profit)),
          backgroundColor: ['red', 'blue', 'green', 'orange', 'purple', 'yellow'],
        }],
      },
      options: chartOptions,
    });

    return () => {
      myChart.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};


export default PieChart;