import React from 'react';

const Table = ({ headers, Productdatarows = [] }) => (
  <table className="data-table">
    <thead>
      <tr>
        {headers.map((col, index) => (
          <th key={index}>{col.label}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {Productdatarows.length > 0 ? (
        Productdatarows.map((entry, index) => (
          <tr key={index}>
            {/* {headers.map((col,idx) => (
              <td key={idx}>{entry[col.field]}</td>
            ))} */}
                <td>{entry.productName}</td>
                <td>{entry.productPrice}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={headers.length}>No data available.</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default Table;