import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        title: {
          display: true,
          text: 'Revenue, Expenses, and Profit per Month',
          fontSize: 16,
        },
      },
    };

    const months = data.map(item => item.month);
    const revenueData = data.map(item => parseFloat(item.revenue));
    const expensesData = data.map(item => parseFloat(item.expenses));
    const profitData = data.map(item => parseFloat(item.profit));

    const myChart = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Revenue',
            data: revenueData,
            backgroundColor: 'green',
            borderColor: 'black',
            borderWidth: 1,
          },
          {
            label: 'Expenses',
            data: expensesData,
            backgroundColor: 'red',
            borderColor: 'black',
            borderWidth: 1,
          },
          {
            label: 'Profit',
            data: profitData,
            backgroundColor: 'blue',
            borderColor: 'black',
            borderWidth: 1,
          },
        ],
      },
      options: chartOptions,
    });

    return () => {
      myChart.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default BarChart;