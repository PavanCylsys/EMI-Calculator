import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({ loanAmount, interestRate, loanTerm }) => {
  // Calculate monthly interest rate
  const monthlyInterestRate = interestRate / 12 / 100;

  // Calculate monthly payment
  const monthlyPayment =
    (loanAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -loanTerm));

  // Calculate data for chart
  const chartData = {
    labels: Array.from({ length: loanTerm }, (_, i) => (i + 1).toString()),
    datasets: [
      {
        label: 'EMI',
        data: Array.from({ length: loanTerm }, (_, i) =>
          Math.round(monthlyPayment * 100) / 100
        ),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Configure options for chart
  const chartOptions = {
    scales: {
      x: {
        type: 'category',
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>EMI Chart</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default Chart;
