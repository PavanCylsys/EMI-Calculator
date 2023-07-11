import React from 'react';

const Table = ({ loanAmount, interestRate, loanTerm }) => {
  // Calculate monthly interest rate
  const monthlyInterestRate = interestRate / 12 / 100;

  // Calculate monthly payment
  const monthlyPayment =
    (loanAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -loanTerm));

  // Calculate data for table
  const tableData = Array.from({ length: loanTerm }, (_, i) => ({
    month: i + 1,
    payment: Math.round(monthlyPayment * 100) / 100,
  }));

  return (
    <div>
      <h2>EMI Table</h2>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>EMI (in Rupees)</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data) => (
            <tr key={data.month}>
              <td>{data.month}</td>
              <td>{data.payment.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
