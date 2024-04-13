import React, { useState } from 'react';

const ColorPicker = ({ selectedColor, onColorChange }) => {
  const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];

  return (
    <div>
      {colors.map((color) => (
        <button
          key={color}
          style={{
            backgroundColor: color,
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            marginRight: '10px',
            cursor: 'pointer',
            ...(selectedColor === color && { outline: '2px solid black' }),
          }}
          onClick={() => onColorChange(color)}
        >
          {color}
        </button>
      ))}
    </div>
  );
};

export default ColorPicker;
