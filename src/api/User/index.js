import service from "../index";

//新建菜单
export function deleteUser(data) {
  return service({
    url: "/user/delete",
    method: "delete",
    params: data
  });
}

export function updateUser(data) {
  return service({
    url: "/user/update",
    method: "put",
    data
  });
}

export function createUser(data) {
  return service({
    url: "/user/create",
    method: "post",
    data
  });
}

export function getUserList(data) {
  return service({
    url: "/user/list",
    method: "get",
    params: data
  });
}
