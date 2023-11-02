import service from "../index";

export function setMenu(data) {
  console.log("data", data);
  return service({
    url: "/menu/update",
    method: "put",
    data
  });
}

export function getMenuList(data) {
  return service({
    url: "/menu/list",
    method: "get",
    params: data
  });
}
