import React, { Component } from 'react';

// import PropTypes from 'prop-types';

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
  // static contextTypes = {
  //   contractActions: PropTypes.object,
  //   contractParams: PropTypes.object,
  // }

  constructor(props) {
    super(props);
    // this.getChartData = this.getChartData.bind(this);
  }

  componentDidMount() {
    // this.documentReady = true;
    // this.forceUpdate();
  }

  calculateSaleReturn() {}
  calculateBuyPrice() {}

  getChartData() {
    // let data = [];
    let step = Math.round(this.props.totalSupply / 10);

    // for (let i = 0; i < this.props.totalSupply * 1.5; i += step) {

    //   let price = this.props.basePrice + ((0.01 * i) ^ 1.8);

    //   data.push({
    //     supply: i,
    //     sell: price,
    //     value: price
    //   });
    // }

    let data = [
      { supply: 0, sell: 80, value: 80 },
      { supply: 100, sell: 84, value: 84 },
      { supply: 200, sell: 93, value: 93 },
      { supply: 300, sell: 105, value: 105 },
      { supply: 400, sell: 120, value: 120 }
    ];

    let currentPrice = {
      supply: this.props.currentSupply,
      value: this.props.currentPrice
    };

    return { data, currentPrice };
  }

  render() {
    let width = Math.min(
      600,
      (window.innerWidth < 480 ? window.innerWidth : 480) - 30
    );
    let height = width * 2 / 3;

    console.log(width, height);

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
            dots={false}
            stackOffset={'none'}
            dataKey="value"
            name={'price'}
            key={'price'}
            stroke="#103A52"
            fill="none"
          />

          <Area
            isAnimationActive={false}
            stackOffset={'none'}
            dataKey="sell"
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
