import service from "../index";

//新建菜单
export function deleteMenu(data) {
  return service({
    url: "/menu/delete",
    method: "delete",
    params: data
  });
}

//新建菜单
export function createMenu(data) {
  return service({
    url: "/menu/create",
    method: "post",
    data
  });
}

//更新菜单
export function updateMenu(data) {
  return service({
    url: "/menu/update",
    method: "put",
    data
  });
}

//菜单列表
export function getMenuList(data) {
  return service({
    url: "/menu/list",
    method: "get",
    params: data
  });
}
