import React from 'react';

const ColorChart = ({ type }) => {
  const colors = type === 'red' ? [
    '#F4C2C2', '#E9967A', '#CD5C5C', '#DC143C', '#B22222', '#8B0000'
  ] : [
    '#FFFACD', '#FAFAD2', '#FFE4B5', '#FFD700', '#FFA500', '#FF8C00'
  ];

  return (
    <div>
      <h2>{type.charAt(0).toUpperCase() + type.slice(1)} Wine Boldness Chart</h2>
      <div style={{ display: 'flex', gap: '10px' }}>
        {colors.map((color, index) => (
          <div
            key={index}
            style={{
              backgroundColor: color,
              width: '50px',
              height: '50px',
              borderRadius: '5px'
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ColorChart;