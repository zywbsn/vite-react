//这个组件用于拦截判断token是否存在。
import { useLocation, Navigate } from "react-router-dom";
function AuthLogin({ children }) {
  const { pathname } = useLocation();
  if (pathname === "/") return <Navigate to="/Home" />;
  //校验
  if (pathname.startsWith("/Login")) {
    return children;
  }
  const token = localStorage.getItem("token");
  if (token) {
    // 1、存在token，则进入主页
    return children;
  } else {
    // 2、如果不存在token，则进入登录页
    return <Navigate to="/Login" />;
  }
}

export default AuthLogin;
