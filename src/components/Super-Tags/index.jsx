import React from "react";
import { Tag } from "antd";

const SuperTags = (props) => {
  const { menu, tags } = props;
  console.log(tags, "tags");
  if (typeof tags === "string") {
    return (
      <Tag color={menu.find((i) => tags == i.value).color} key={tags}>
        {tags}
      </Tag>
    );
  } else {
    return tags.map((item) => (
      <Tag color={menu.find((i) => item == i.value).color} key={item}>
        {item}
      </Tag>
    ));
  }
};

export default SuperTags;
