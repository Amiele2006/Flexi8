import React from 'react';

const DataTable = ({ columns, datarows = []}) => (
  <table className="data-table">
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col.field}>{col.label}</th>
        ))}
      </tr>
    </thead>
        <tbody>
      {datarows.length > 0 ? (
        datarows.map((entry, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={col.field}>{entry[col.field]}</td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={columns.length}>No data available.</td>
        </tr>
      )}
      </tbody>
  </table>
);

export default DataTable;