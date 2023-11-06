import { Button, Tooltip } from "antd";

const SuperButton = (props) => {
  const { buttonConfig, tooltipConfig, text, methods, className } = props;

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
