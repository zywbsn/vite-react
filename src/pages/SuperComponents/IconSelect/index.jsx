import React from "react";
import SelectIcon from "../../../components/Select-Icon";
import Icon from "@ant-design/icons";
import * as icons from "@ant-design/icons";

const IconSelect = () => {
  const [iconValue, setIconValue] = React.useState("");
  const setValue = (value) => {
    setIconValue(value);
  };
  return (
    <>
      <div className="main">
        <SelectIcon setValue={setValue} />
        <div>
          选中的图标：
          {iconValue ? <Icon component={icons[iconValue]} style={{ marginRight: "8px" }} /> : "--"}
        </div>
        <div>
          图标名称：
          {iconValue || "--"}
        </div>
        <div>iconStyle select icon 样式</div>
        <div>setValue 返回选中 icon value</div>
        <div>
          import Icon from "@ant-design/icons"; import * as icons from "@ant-design/icons";
          {"<Icon component={icons[setValue]} />"}
        </div>
      </div>
    </>
  );
};

export default IconSelect;
