import { Select } from "antd";
import Icon from "@ant-design/icons";
import * as icons from "@ant-design/icons";

const SelectIcon = ({ placeholder = "请选择图标", setValue, iconStyle }) => {
  // 里面有一些是方法,要筛选一遍,否则页面会报错
  const iconList = Object.keys(icons).filter(
    (item) => typeof icons[item] === "object" && item !== "default"
  );

  const onSelect = (value) => {
    setValue(value);
  };
  return (
    <Select
      onSelect={onSelect}
      placeholder={placeholder}
      showSearch
      allowClear
      optionLabelProp="children"
      style={{ width: "100%" }}>
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
