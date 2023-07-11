import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Simpleemi = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    setupChartData();
  }, [monthlyPayment]);

  const setupChartData = () => {
    const principal = parseFloat(loanAmount);
    const remainingAmount = principal - monthlyPayment;
    const interest = monthlyPayment * loanTerm - principal;

    const data = {
      labels: ['Principal', 'Interest'],
      datasets: [
        {
          data: [principal, interest],
          backgroundColor: ['168, 74, 50', '#dc3545'],
        },
      ],
    };

    const options = {
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              const labelIndex = context.dataIndex;
              if (labelIndex === 0) {
                return `Principal: ${principal} Rupees`;
              } else if (labelIndex === 1) {
                return `Interest: ${interest.toFixed(2)} Rupees`;
              }
            },
          },
        },
      },
    };

    setChartData({ data, options });
  };

  const calculateMonthlyPayment = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseFloat(loanTerm);

    if (principal && rate && term) {
      const monthlyRate = Math.pow(1 + rate, term);
      const monthlyPayment = (principal * rate * monthlyRate) / (monthlyRate - 1);
      setMonthlyPayment(monthlyPayment.toFixed(2));
    }
  };

  return (
    <div className="container-fluid bg-gray mt-5">
      <h2 className="mb-4">Loan EMI Calculator</h2>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="loanAmount" className="form-label">
            Loan Amount (in Rupees):
          </label>
          <input
            type="number"
            id="loanAmount"
            className="form-control  bg-dark text-white"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="interestRate" className="form-label">
            Annual Interest Rate (%):
          </label>
          <input
            type="number"
            id="interestRate"
            className="form-control bg-dark text-white"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="loanTerm" className="form-label">
            Loan Term (in months):
          </label>
          <input
            type="number"
            id="loanTerm"
            className="form-control bg-dark text-white"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <button className="btn btn-primary" onClick={calculateMonthlyPayment}>
            Calculate
          </button>
        </div>
      </div>
      {chartData && chartData.data && (
        <div className="row">
          <div className="col-md-6">
            <h3>Monthly Payment:</h3>
            <p>{monthlyPayment} Rupees</p>
            <div className="row">
              <div className="col-md-6">
                <p>
                  <strong>Principal:</strong> {loanAmount} Rupees
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Interest:</strong> {(monthlyPayment * loanTerm - loanAmount).toFixed(2)} Rupees
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="chart-container" style={{ maxHeight: '300px' }}>
              <Pie data={chartData.data} options={chartData.options} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Simpleemi;
