import React from "react";
import * as echarts from "echarts";
import "echarts-liquidfill/src/liquidFill.js"; //在这里引入

const EChart = ({ option, ...rest }) => {
  const eChartsRef = React.useRef();

  React.useEffect(() => initEChart(), []);

  const initEChart = () => {
    var myChart = echarts.init(eChartsRef.current);
    myChart.setOption(option);
  };

  return <div ref={eChartsRef} style={{ width: "100%", height: "100%" }} {...rest} />;
};

export default EChart;
