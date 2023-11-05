import { message } from "antd";

export const CheckStatus = (status) => {
  console.log("status", status);
  const msgList = [
    { status: 400, message: "请求失败！请您稍后重试" },
    { status: 401, message: "登录失效！请您重新登录" },
    { status: 403, message: "当前账号无权限访问！" },
    { status: 404, message: "请求地址不存在！" },
    { status: 405, message: "请求方式不正确！" },
    { status: 406, message: "请求参数不正确！" },
    { status: 408, message: "请求超时！" },
    { status: 500, message: "服务器内部错误！" },
    { status: 501, message: "服务器不支持当前请求！" },
    { status: 502, message: "网关错误！" },
    { status: 503, message: "服务不可用！" },
    { status: 504, message: "网关超时！" },
    { status: 509, message: "服务器超时！" },
    { status: 510, message: "服务器未实现！" }
  ];
  const msg = msgList.find((item) => item.status === status).message;
  console.log("Request Status", msg);
  if (status === 401) return message.error(msg, 1, () => (window.location.href = "/Login"));
  // if (status === 401) return message.error(msg, 1, () => localStorage.removeItem("token"));
  message.error(msg);
  // switch (status) {
  //   case 400:
  //     message.error("请求失败！请您稍后重试");
  //     break;
  //   case 401:
  //     message.error("登录失效！请您重新登录");
  //     break;
  //   case 403:
  //     message.error("当前账号无权限访问！");
  //     break;
  //   case 404:
  //     message.error("你所访问的资源不存在！");
  //     break;
  //   case 405:
  //     message.error("请求方式错误！请您稍后重试");
  //     break;
  //   case 408:
  //     message.error("请求超时！请您稍后重试");
  //     break;
  //   case 500:
  //     message.error("服务异常！");
  //     break;
  //   case 502:
  //     message.error("网关错误！");
  //     break;
  //   case 503:
  //     message.error("服务不可用！");
  //     break;
  //   case 504:
  //     message.error("网关超时！");
  //     break;
  //   default:
  //     message.error("请求失败！");
  // }
};
