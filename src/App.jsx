import React from "react";
import Layouts from "./Layouts/index";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/index";
import MenuList from "./utils/GetRoutesList";
import { AuthLogin } from "./components/index";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 路由重定向 */}
          {/* <Route path="/" element={<Navigate to="/Login" />} /> */}
          <Route path="/Login" element={<Login />} />
          <Route
            path="/"
            element={
              <AuthLogin>
                <Layouts />
              </AuthLogin>
            }>
            {MenuList.map((item) => {
              if (item.component)
                return <Route key={item.key} path={item.key} element={<item.component />} />;
            })}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
