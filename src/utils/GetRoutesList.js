const reg = /(?<=\/).*?(?=\/)/;

//获取路由配置文件
const routesMeta = import.meta.glob("../pages/**/router.jsx", {
  eager: true,
  import: "default"
});

const componentsList = import.meta.glob("../pages/**/index.jsx", {
  eager: true
});

let MenuList = [];

for (const key in routesMeta) {
  let pathName = key.replace("../pages", "").replace("/router.jsx", "");
  const component = key.replace("router.jsx", "index.jsx");
  const icon = routesMeta[key].icon || "";
  if (routesMeta[key].isFather) {
    MenuList.push({
      label: routesMeta[key].name,
      path: "/Layout" + pathName,
      children: [],
      icon,
      sort: routesMeta[key].sort
    });
  } else {
    MenuList.push({
      label: routesMeta[key].name,
      path: "/Layout" + pathName,
      component: componentsList[component].default,
      icon,
      sort: routesMeta[key].sort
    });
  }
}

console.log(MenuList);

export default MenuList;
