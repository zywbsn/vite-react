//随机颜色
export const randomColor = () => {
  const numbers = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += numbers[Math.floor(Math.random() * 16)];
  }
  return color;
};

//菜单获取 label
export const getMenuName = (menu, key) => {
  if (key.match(/\//g).length === 1) {
    return menu.find((item) => item.key === key)?.label;
  } else {
    return menu
      .find((item) => item.key === key.split("/").slice(0, 2).join("/"))
      ?.children.find((item) => item.key === key)?.label;
  }
};
