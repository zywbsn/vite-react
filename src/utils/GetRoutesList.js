const reg = /(?<=\/).*?(?=\/)/;

//获取路由配置文件
const routesMeta = import.meta.glob("../pages/**/router.jsx", {
  eager: true,
  import: "default"
});

const componentsList = import.meta.glob("../pages/**/index.jsx", {
  eager: true
});

console.log("routesMeta", routesMeta);
console.log("componentsList", componentsList);
let MenuList = [];

for (const key in componentsList) {
  let pathName = key.replace("../pages", "").replace("/index.jsx", "");
  const component = key.replace("router.jsx", "index.jsx");
  console.log("component", component);
  // const icon = routesMeta[key].icon || "";
  // if (routesMeta[key].isFather) {
  //   MenuList.push({
  //     label: routesMeta[key].name,
  //     key: "/Layout" + pathName,
  //     children: [],
  //     // icon,
  //     sort: routesMeta[key].sort
  //   });
  // } else {
  MenuList.push({
    // label: routesMeta[key].name,
    key: "/Layout" + pathName,
    component: componentsList[component].default
    // icon,
    // sort: routesMeta[key].sort
  });
  // }
}

console.log("MenuList", MenuList);

export default MenuList;
