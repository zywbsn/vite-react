import service from "../index";

//登录
export function Login(data) {
  return service({
    url: "/login",
    method: "post",
    data
  });
}
