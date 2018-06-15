import React, { Component } from 'react';
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
  ComposedChart
} from 'recharts';

class CurveChart extends Component {
  componentDidMount() {}

  getChartData() {
    function calcPrice(exponent, tokenNumber, basePrice, totalSupply) {
      const price =
        basePrice + Math.pow(tokenNumber / (totalSupply * 0.25), exponent);
      return Math.round(price * 100) / 100;
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
          this.props.exponent,
          i,
          this.props.basePrice,
          totalSupply
        )
      });
    }

    let currentPrice = {
      supply: currentSupply,
      value: calcPrice(
        this.props.exponent,
        currentSupply,
        this.props.basePrice,
        totalSupply
      )
    };

    return { data, currentPrice };
  }

  render() {
    let width = Math.min(
      600,
      (window.innerWidth < 480 ? window.innerWidth : 480) - 30
    );
    let height = (width * 2) / 3;

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
            stroke="#175772"
            fill="#175772"
          />

          <ReferenceDot
            isFront={true}
            alwaysShow={true}
            x={currentPrice.supply}
            y={currentPrice.value}
            r={36}
            fill="#fff"
            stroke="#175772"
            label={'$' + currentPrice.value}
          />
        </ComposedChart>
      </div>
    );
  }
}

export default CurveChart;
