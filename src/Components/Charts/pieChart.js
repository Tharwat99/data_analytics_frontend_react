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
    // Function to generate an array of colors
    const generateColors = (length) => {
      const colors = [];
      for (let i = 0; i < length; i++) {
        // Generate a random color or use a predefined color array
        // You can modify this logic based on your requirements
        const color = getRandomColor();
        colors.push(color);
      }
      return colors;
    };

    // Function to generate a random color
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 10)];
      }
      return color;
};
    const colors = generateColors(data.length);
    const myChart = new Chart(chartRef.current, {
      type: 'pie',
      data: {
        labels: data.map(item => item.month),
        datasets: [{
          data: data.map(item => parseFloat(item.profit)),
          backgroundColor: colors,
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