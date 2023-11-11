import React from "react";
import { theme } from "antd";
import ResourceSelector from "../../../components/Resource-Selector";

const { useToken } = theme;
const ResourceSelectorPage = () => {
  const { token } = useToken();

  return (
    <>
      <div className="main" style={{ backgroundColor: token.colorBgContainer }}>
        <ResourceSelector />
      </div>
    </>
  );
};

export default ResourceSelectorPage;
