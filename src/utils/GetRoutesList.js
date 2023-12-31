// const reg = /(?<=\/).*?(?=\/)/;

//获取文件
const componentsList = import.meta.glob("../pages/**/index.jsx", {
  eager: true
});
let MenuList = [];

for (const key in componentsList) {
  let pathName = key.replace("../pages", "").replace("/index.jsx", "");
  const component = key;
  MenuList.push({
    // key: "/Layout" + pathName,
    key: pathName,
    component: componentsList[component].default
  });
}
console.log("路由", MenuList);
export default MenuList;
