import React from "react";
import { ECharts } from "../../components";
import { theme } from "antd";

const { useToken } = theme;
const Home = () => {
  const { token } = useToken();

  const option = {
    graphic: {
      elements: [
        {
          type: "text",
          left: "center",
          top: "center",
          style: {
            text: "silence lamb",
            fontSize: 160,
            fontWeight: "bold",
            lineDash: [0, 200],
            lineDashOffset: 0,
            fill: "transparent",
            stroke: "#000",
            lineWidth: 1
          },
          keyframeAnimation: {
            duration: 3000,
            loop: true,
            keyframes: [
              {
                percent: 0.7,
                style: {
                  fill: "transparent",
                  lineDashOffset: 200,
                  lineDash: [200, 0]
                }
              },
              {
                // Stop for a while.
                percent: 0.8,
                style: {
                  fill: "transparent"
                }
              },
              {
                percent: 1,
                style: {
                  fill: "black"
                }
              }
            ]
          }
        }
      ]
    }
  };
  return (
    <>
      <div className="main" style={{ backgroundColor: token.colorBgContainer }}>
        <ECharts option={option} />
      </div>
    </>
  );
};
export default Home;
