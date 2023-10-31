import MenuList from "./GetRoutesList";

let menus = MenuList;
menus.map((item) => {
  item.key = item.path;
  if (item.path.match(/\//g).length === 3) {
    const path = item.path.split("/").slice(0, 3).join("/");
    MenuList.map((i) => {
      if (i.path === path) {
        i.children.push(item);
      }
    });
  }
});
menus = menus.filter((item) => item.path.match(/\//g).length === 2);
menus.sort((a, b) => a.sort - b.sort); //父级路由排序
menus.forEach((router) => {
  if (router.children) router.children.sort((a, b) => a.sort - b.sort);
});
console.log("menus", menus);
export default menus;
