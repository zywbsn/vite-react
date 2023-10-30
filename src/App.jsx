import React from "react";
import Layouts from "./Layouts/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/index";
import MenuList from "./utils/GetRoutesList";

// eslint-disable-next-line react-refresh/only-export-components
export default () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Layout" element={<Layouts />}>
            {MenuList.map((item) => {
              if (item.component)
                return <Route key={item.path} path={item.path} element={<item.component />} />;
            })}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
