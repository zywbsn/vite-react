import MenuList from "./GetRoutesList";

let menus = MenuList;
menus.map((item) => {
  item.key = item.path;
  if (item.path.match(/\//g).length === 3) {
    MenuList.map((i) => {
      if (item.path.indexOf(i.path) !== -1 && i.path !== item.path) i.children.push(item);
    });
  }
});
menus = menus.filter((item) => item.path.match(/\//g).length === 2);

export default menus;
