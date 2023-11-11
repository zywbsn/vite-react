import React from "react";
import { Select } from "antd";
import Icon from "@ant-design/icons";
import * as icons from "@ant-design/icons";

const SelectIcon = ({
  value = undefined,
  placeholder = "请选择图标",
  setValue,
  iconStyle,
  mode,
  ...rest
}) => {
  // 里面有一些是方法,要筛选一遍,否则页面会报错
  const iconList = Object.keys(icons).filter(
    (item) => typeof icons[item] === "object" && item !== "default"
  );
  const [defaultValue, setDefaultValue] = React.useState(mode === "multiple" ? [] : "");
  const onSelect = (value) => {
    const iconValue = mode === "multiple" ? [...(defaultValue || []), value] : value;
    setDefaultValue(iconValue);
    setValue && setValue(iconValue);
  };
  return (
    <Select
      value={value}
      placeholder={placeholder}
      mode={mode}
      showSearch
      allowClear
      optionLabelProp="children"
      style={{ width: "100%" }}
      onSelect={onSelect}
      {...rest}>
      {iconList.map((item) => {
        return (
          <Select.Option value={item} key={item}>
            <Icon component={icons[item]} style={{ marginRight: "8px", ...iconStyle }} />
            {item}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default SelectIcon;
