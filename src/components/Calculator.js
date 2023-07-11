import React, { useState } from 'react';
import Chart from './Chart';
import Table from './Table';
import Slider from 'react-slider';

const Calculator = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(10);
  const [loanTerm, setLoanTerm] = useState(12);

  const handleLoanAmountChange = (value) => {
    setLoanAmount(value);
  };

  const handleInterestRateChange = (value) => {
    setInterestRate(value);
  };

  const handleLoanTermChange = (value) => {
    setLoanTerm(value);
  };

  return (
    <div>
      <h1>Loan EMI Calculator</h1>
      <div>
        <label>Loan Amount (in Rupees):</label>
        <Slider
          min={100000}
          max={10000000}
          step={100000}
          value={loanAmount}
          onChange={handleLoanAmountChange}
        />
        <span>{loanAmount.toLocaleString()} Rupees</span>
      </div>
      <div>
        <label>Interest Rate (%):</label>
        <Slider
          min={1}
          max={20}
          step={0.5}
          value={interestRate}
          onChange={handleInterestRateChange}
        />
        <span>{interestRate} %</span>
      </div>
      <div>
        <label>Loan Term (in months):</label>
        <Slider
          min={6}
          max={60}
          step={6}
          value={loanTerm}
          onChange={handleLoanTermChange}
        />
        <span>{loanTerm} months</span>
      </div>
      <Chart
        loanAmount={loanAmount}
        interestRate={interestRate}
        loanTerm={loanTerm}
      />
      <Table
        loanAmount={loanAmount}
        interestRate={interestRate}
        loanTerm={loanTerm}
      />
    </div>
  );
};

export default Calculator;
