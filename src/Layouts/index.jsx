import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined, Html5TwoTone } from "@ant-design/icons";
import { Layout, Menu, Button, ConfigProvider, Switch, theme, ColorPicker } from "antd";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import menus from "../utils/GetMenusList";
import { useEffect } from "react";
const { useToken } = theme;

const menuList = menus;

const { Header, Sider, Content } = Layout;

const Layouts = () => {
  const { token } = useToken();
  const Navigate = useNavigate();
  const usePath = useLocation();
  const [colorTextBase, setColorTextBase] = useState(token.colorTextBase);
  const [colorBgContainer, setColorBgContainer] = useState(token.colorBgContainer);
  const [colorBorderSecondary, setColorBorderSecondary] = useState(token.colorBorderSecondary);
  const [darkStatus, setDarkStatus] = useState(
    localStorage.getItem("dark") == "true" ? true : false
  );
  const [collapsed, setCollapsed] = useState(false); //菜单展开
  const { pathname: defaultSelectedKeys } = usePath;
  const defaultOpenKeys = defaultSelectedKeys.split("/").slice(0, 3).join("/"); //刷新默认展开
  //点击菜单
  const onSelectMenu = ({ key }) => {
    Navigate(key);
  };

  const primaryColor = localStorage.getItem("primary"); //缓存主题色
  const [primary, setPrimary] = useState(primaryColor ?? "#1677ff");
  const [themeColor, setThemeColor] = useState({});

  //改变主题色
  const onChangeColor = (value) => {
    const color = value.toHexString();
    setPrimary(color);
    localStorage.setItem("primary", color);
  };

  //暗黑模式
  const darkColor = {
    colorTextBase: "#D2D2D2", //用于派生文本色梯度的基础变量，v5 中我们添加了一层文本色的派生算法可以产出梯度明确的文本色的梯度变量
    colorBgLayout: "#000000", //该色用于页面整体布局的背景色，只有需要在页面中处于 B1 的视觉层级时才会使用该 token，其他用法都是错误的
    colorBgElevated: "#1F1F1F", //浮层容器背景色，在暗色模式下该 token 的色值会比 `colorBgContainer` 要亮一些。例如：模态框、弹出框、菜单等。
    colorBorder: "#313131", //默认使用的边框颜色, 用于分割不同的元素，例如：表单的分割线、卡片的分割线等。
    colorBorderSecondary: "#313131", //比默认使用的边框色要浅一级，此颜色和 colorSplit 的颜色一致。使用的是实色。
    colorBgContainer: "#141414" //组件的容器背景色，例如：默认按钮、输入框等。
  };

  //切换暗黑模式
  const onChange = (checked) => {
    localStorage.setItem("dark", checked);
    setDarkStatus(checked);
    setThemeColor(checked ? darkColor : {});
    setColorTextBase(checked ? darkColor.colorTextBase : token.colorTextBase);
    setColorBgContainer(checked ? darkColor.colorBgContainer : token.colorBgContainer);
    setColorBorderSecondary(checked ? darkColor.colorBorderSecondary : token.colorBorderSecondary);
  };

  useEffect(() => {
    onChange(darkStatus);
  }, []);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: primary,
            ...themeColor
          }
        }}>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{ backgroundColor: colorBgContainer, color: colorTextBase }}>
            <div className="w-full h-16 flex items-center justify-center">
              <Html5TwoTone twoToneColor="#A6ADB4" className="!text-3xl mr-1" />
              <span className={collapsed ? "hidden" : "text-lg font-bold"}>React-Admin</span>
            </div>
            <Menu
              theme="light"
              mode="inline"
              className="h-[calc(100vh-64px)] overflow-auto"
              defaultOpenKeys={[defaultOpenKeys]}
              defaultSelectedKeys={[defaultSelectedKeys]}
              items={menuList}
              onClick={onSelectMenu}
            />
          </Sider>
          <Layout>
            <Header
              style={{
                padding: 0,
                backgroundColor: colorBgContainer,
                borderBottom: `1px solid ${colorBorderSecondary}`
              }}
              className="flex w-full items-center">
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
              <ColorPicker defaultValue={primary} onChange={onChangeColor} />
              <Switch checked={darkStatus} onChange={onChange} />
            </Header>
            <Content
              className="m-3 p-4 h-[calc(100vh-112px)] overflow-auto rounded-md"
              style={{ backgroundColor: colorBgContainer }}>
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
};

export default Layouts;
