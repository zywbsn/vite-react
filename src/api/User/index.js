import service from "../index";

export function getUserList(data) {
  return service({
    url: "/user/list",
    method: "get",
    params: data
  });
}
