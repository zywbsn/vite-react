import React from "react";
import { Select } from "antd";
import Icon from "@ant-design/icons";
import * as icons from "@ant-design/icons";

const SelectIcon = ({ placeholder = "请选择图标", setValue, iconStyle, mode, ...rest }) => {
  // 里面有一些是方法,要筛选一遍,否则页面会报错
  const iconList = Object.keys(icons).filter(
    (item) => typeof icons[item] === "object" && item !== "default"
  );
  const [defaultValue, setDefaultValue] = React.useState();

  const onSelect = (value) => {
    mode === "multiline"
      ? setDefaultValue(value)
      : setDefaultValue([...(defaultValue || []), value]);
    setValue(defaultValue);
  };
  return (
    <Select
      onSelect={onSelect}
      placeholder={placeholder}
      defaultValue={defaultValue}
      showSearch
      allowClear
      optionLabelProp="children"
      mode={mode}
      style={{ width: "100%" }}
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
