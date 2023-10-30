import { Button, Tooltip } from "antd";

const SuperButton = (props) => {
  const { buttonConfig, tooltipConfig, text, methods, className } = props;
  // console.log(buttonConfig);
  if (buttonConfig.icon) {
    // console.log("buttonConfig.icon", buttonConfig.icon);
    // buttonConfig.icon = <buttonConfig.icon />;
    //<buttonConfig.icon />;
  }
  if (props.tooltipConfig) {
    return (
      <Tooltip {...tooltipConfig} className={"mr-3 " + className}>
        <Button {...buttonConfig} {...methods}>
          {text}
        </Button>
      </Tooltip>
    );
  }
  return (
    <Button className={"mr-3 " + className} {...buttonConfig} {...methods}>
      {text}
    </Button>
  );
};

export default SuperButton;
