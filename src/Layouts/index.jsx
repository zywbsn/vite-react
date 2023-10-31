import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined, Html5TwoTone } from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import menus from "../utils/GetMenusList";

const { Header, Sider, Content } = Layout;
const Layouts = () => {
  const Navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const onSelectMenu = ({ key }) => {
    Navigate(key);
  };

  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="w-full h-16 flex items-center justify-center bg-[#ffffff]">
            <Html5TwoTone twoToneColor="#A6ADB4" className="!text-3xl mr-1" />
            <span className={collapsed ? "hidden" : "text-lg font-bold"}>React-Admin</span>
          </div>
          <Menu
            theme="light"
            mode="inline"
            className="h-[calc(100vh-64px)] overflow-auto"
            defaultSelectedKeys={["1"]}
            items={menus}
            onClick={onSelectMenu}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              backgroundColor: "#ffffff"
            }}
            className="flex w-full">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              height: "calc(100vh - 112px)",
              overflow: "auto",
              backgroundColor: "#ffffff"
            }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default Layouts;
