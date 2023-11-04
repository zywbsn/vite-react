import service from "../index";

//新建菜单
export function Login(data) {
  return service({
    url: "/login",
    method: "post",
    data
  });
}
