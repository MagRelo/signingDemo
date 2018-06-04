import React from 'react';

import arrow from '../../icon/arrow.svg';

const Indicator = ({ value, label }) => {
  function rotateArrow(input) {
    return 270 - input * 1.8;
  }

  return (
    <div>
      <img
        src={arrow}
        alt={label + ' trend value: ' + value}
        style={{
          maxHeight: '2em',
          transform: 'rotateZ(' + rotateArrow(value) + 'deg)',
          marginBottom: '0.5em',
          marginTop: '0.5em'
        }}
      />
      <label className="label-upper">{label}</label>
    </div>
  );
};

export default Indicator;
