import React from "react";
import Layouts from "./Layouts/index";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/index";
import MenuList from "./utils/GetRoutesList";

// eslint-disable-next-line react-refresh/only-export-components
export default () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 路由重定向 */}
          <Route path="/" exact element={<Navigate to="/Login" />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Layout" element={<Layouts />}>
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
