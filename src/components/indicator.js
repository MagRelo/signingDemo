import React from 'react';

const Indicator = ({ value, label }) => {
  function rotateArrow(input) {
    return 180 - input * 1.8;
  }

  return (
    <div>
      <div
        style={{
          fontSize: 'larger',
          transform: 'rotateZ(' + rotateArrow(value) + 'deg)',
          marginBottom: '0.5em'
        }}
      >
        &uarr;
      </div>
      <label className="label-upper">{label}</label>
    </div>
  );
};

export default Indicator;
