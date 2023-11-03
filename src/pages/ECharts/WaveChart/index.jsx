import React from "react";
import { ECharts } from "../../../components/index";
import { theme } from "antd";

const { useToken } = theme;

const WaveChart = () => {
  const { token } = useToken();
  const option = {
    title: {
      text: token.colorBgContainer
    },
    series: [
      {
        type: "liquidFill",
        radius: "50%",
        z: 6,
        center: ["50%", "50%"],
        color: ["#c1dce7", "#90d3f0", "#009bdb"],
        data: [0.8, 0.7, 0.6],
        backgroundStyle: {
          color: "transparent"
        },
        label: {
          normal: {
            textStyle: {
              color: token.colorPrimary,
              fontSize: 40
            }
          }
        },
        outline: {
          show: true,
          itemStyle: {
            borderWidth: 0
          },
          borderDistance: 0
        }
      },
      {
        name: "第二层白边",
        type: "pie",
        z: 3,
        radius: ["0%", "55%"],
        center: ["50%", "50%"],
        data: [
          {
            value: 100,
            itemStyle: {
              color: token.colorBgContainer
            }
          }
        ],
        itemStyle: {
          normal: {
            label: {
              show: false
            }
          }
        }
      },
      {
        name: "最外蓝边",
        type: "pie",
        z: 1,
        radius: ["0%", "58%"],
        center: ["50%", "50%"],
        hoverAnimation: false,
        itemStyle: {
          normal: {
            label: {
              show: false
            }
          }
        },
        data: [
          {
            value: 100,
            itemStyle: {
              color: token.colorPrimary
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <div className="main" style={{ backgroundColor: token.colorBgContainer }}>
        <ECharts option={option} />
      </div>
    </>
  );
};

export default WaveChart;
