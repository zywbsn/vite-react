//随机颜色
export const randomColor = () => {
  const numbers = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += numbers[Math.floor(Math.random() * 16)];
  }
  return color;
};
