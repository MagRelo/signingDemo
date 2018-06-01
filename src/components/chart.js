import React, { Component } from 'react';
const Recharts = require('recharts');

const {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
  ComposedChart
} = Recharts;

class CurveChart extends Component {
  componentDidMount() {}

  getChartData() {
    function calcPrice(basis, exponent, tokenNumber, basePrice) {
      const premium = Math.pow(basis * tokenNumber, exponent);
      const price = parseInt(basePrice, 10) + premium;
      const rounded = Math.round(price * 100) / 100;
      return rounded;
    }

    const totalSupply = this.props.totalSupply || -1;
    const currentSupply = this.props.currentSupply || 100;

    // build graph data
    const step = Math.round(totalSupply / 10);
    let data = [];
    for (let i = 0; i <= totalSupply; i += step) {
      data.push({
        supply: i,
        value: calcPrice(
          this.props.basis,
          this.props.exponent,
          i,
          this.props.basePrice
        )
      });
    }

    let currentPrice = {
      supply: currentSupply,
      value: calcPrice(
        this.props.basis,
        this.props.exponent,
        currentSupply,
        this.props.basePrice
      )
    };

    return { data, currentPrice };
  }

  render() {
    let width = Math.min(
      600,
      (window.innerWidth < 480 ? window.innerWidth : 480) - 30
    );
    let height = width * 2 / 3;

    let { data, currentPrice } = this.getChartData();

    return (
      <div>
        <ComposedChart
          style={{ margin: 'auto' }}
          width={width}
          height={height}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="supply" type={'number'} />
          <YAxis
            dataKey="value"
            type={'number'}
            domain={['dataMin - 15', 'dataMax + 15']}
            inc
          />
          <Tooltip />

          <Area
            isAnimationActive={false}
            stackOffset={'none'}
            dataKey="value"
            stroke="#ff5935"
            fill="#ff5935"
          />

          <ReferenceDot
            isFront={true}
            alwaysShow={true}
            x={currentPrice.supply}
            y={currentPrice.value}
            r={36}
            fill="#fff"
            stroke="#103A52"
            label={'$' + currentPrice.value}
          />
        </ComposedChart>
      </div>
    );
  }
}

export default CurveChart;
