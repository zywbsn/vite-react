import React from "react";
import { Tag } from "antd";

const SuperTags = (props) => {
  const { menu, tags } = props;
  return tags.map((item) => (
    <Tag color={menu.find((i) => item == i.value).color} key={item}>
      {item}
    </Tag>
  ));
};

export default SuperTags;
