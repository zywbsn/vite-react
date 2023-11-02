// const reg = /(?<=\/).*?(?=\/)/;

//获取文件
const componentsList = import.meta.glob("../pages/**/index.jsx", {
  eager: true
});
let MenuList = [];

for (const key in componentsList) {
  let pathName = key.replace("../pages", "").replace("/index.jsx", "");
  const component = key.replace("router.jsx", "index.jsx");
  MenuList.push({
    key: "/Layout" + pathName,
    component: componentsList[component].default
  });
}

export default MenuList;
