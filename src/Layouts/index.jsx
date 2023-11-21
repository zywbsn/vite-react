import React from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  Html5TwoTone,
  DownOutlined
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  ConfigProvider,
  Switch,
  theme,
  ColorPicker,
  Breadcrumb,
  Tabs,
  Dropdown
} from "antd";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { getMenuList } from "../api/Menu";
import Icon from "@ant-design/icons";
import * as icons from "@ant-design/icons";
import { getMenuName } from "../utils/utils";

const { useToken } = theme;

const { Header, Sider, Content } = Layout;

const Layouts = () => {
  const { token } = useToken();
  const Navigate = useNavigate();
  const usePath = useLocation();
  const [menu, setMenu] = React.useState([]); //菜单
  const [colorTextBase, setColorTextBase] = React.useState(token.colorTextBase);
  const [colorBgContainer, setColorBgContainer] = React.useState(token.colorBgContainer);
  const [colorBorderSecondary, setColorBorderSecondary] = React.useState(
    token.colorBorderSecondary
  );
  const [darkStatus, setDarkStatus] = React.useState(
    localStorage.getItem("dark") == "true" ? true : false
  );
  const [collapsed, setCollapsed] = React.useState(false); //菜单展开
  const { pathname: defaultSelectedKeys } = usePath; //当前路由
  const defaultOpenKeys = defaultSelectedKeys.split("/").slice(0, 2).join("/"); //刷新默认展开

  const [tabs, setTabs] = React.useState([]); //tab
  const [activeKey, setActiveKey] = React.useState(defaultSelectedKeys); //tab //点击菜单
  const onSelectMenu = ({ key }) => {
    setActiveKey(key);
    const keys = tabs.map((item) => item.key);
    if (!keys.includes(key)) setTabs([...tabs, { key, label: getMenuName(menu, key) }]);
    localStorage.setItem("tabs", JSON.stringify(tabs));
    Navigate(key);
  };

  const primaryColor = localStorage.getItem("primary"); //缓存主题色
  const [primary, setPrimary] = React.useState(primaryColor ?? "#1677ff");
  const [themeColor, setThemeColor] = React.useState({});

  //改变主题色
  const onChangeColor = (value) => {
    const color = value.toHexString();
    setPrimary(color);
    localStorage.setItem("primary", color);
  };

  //暗黑模式
  const darkColor = {
    colorTextBase: "#D2D2D2", //用于派生文本色梯度的基础变量，v5 中我们添加了一层文本色的派生算法可以产出梯度明确的文本色的梯度变量
    colorBgLayout: "#333333", //该色用于页面整体布局的背景色，只有需要在页面中处于 B1 的视觉层级时才会使用该 token，其他用法都是错误的
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

  const getList = () => {
    getMenuList({ page: -1 }).then((response) => {
      const { list } = response.data;
      const menu = list.map((item) => {
        item.icon = item.icon ? (
          <Icon component={icons[item.icon]} style={{ marginRight: "8px" }} />
        ) : null;
        return item;
      });
      setMenu(menu);
      setTabs([{ key: defaultSelectedKeys, label: getMenuName(menu, defaultSelectedKeys) }]);
    });
  };

  const DropdownClick = {
    0: (pathname) => {
      // Navigate(0);
      Navigate(pathname);
    },
    1: (pathname) => {
      const newTabs = tabs.filter((tab) => tab.key !== pathname);
      setTabs(newTabs);
      if (newTabs.length !== 0) return onSelectMenu({ key: newTabs[newTabs.length - 1].key });
      Navigate("/");
    },
    2: (pathname) => {
      setTabs([]);
      Navigate("/");
    },
    3: (pathname) => {
      const newTabs = tabs.filter((tab) => tab.key === pathname);
      setTabs(newTabs);
    }
  };

  const onClickDropdown = ({ key }) => {
    const { pathname } = usePath;
    DropdownClick[key](pathname);
  };

  const dropdownList = [
    // {
    //   key: 0,
    //   label: "刷新"
    // },
    {
      key: 1,
      label: "关闭当前页"
    },
    {
      key: 2,
      label: "关闭全部标签"
    },
    {
      key: 3,
      label: "关闭其他标签"
    }
  ];
  const operations = (
    <Dropdown
      className=" ml-auto mr-5"
      menu={{
        onClick: onClickDropdown,
        items: dropdownList
      }}
      placement="bottomLeft">
      <DownOutlined />
    </Dropdown>
  );
  const onEdit = (targetKey, action) => {
    if (action === "remove") {
      const newTabs = tabs.filter((tab) => tab.key !== targetKey);
      setTabs(newTabs);
      if (newTabs.length === 0) Navigate("/");
    }
  };

  React.useEffect(() => {
    getList();
    onChange(darkStatus);
  }, []);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: primary,
            ...themeColor
          },
          components: {
            Form: {
              itemMarginBottom: "12px"
            },
            Tabs: {
              horizontalMargin: 0
              // horizontalItemPaddingSM: 0
            }
            // Pagination: {
            //   /* here is your component tokens */
            // },
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
              items={menu}
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
              className="flex w-full items-center h-[60px] flex-wrap">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px"
                  // width: 64,
                  // height: 64
                }}
              />
              <Breadcrumb
                items={
                  defaultSelectedKeys !== defaultOpenKeys
                    ? [
                        { title: menu.find((item) => item.key === defaultOpenKeys)?.label },
                        {
                          title: menu
                            .find((item) => item.key === defaultOpenKeys)
                            ?.children.find((item) => item.key === defaultSelectedKeys)?.label
                        }
                      ]
                    : [{ title: menu.find((item) => item.key === defaultOpenKeys)?.label }]
                }></Breadcrumb>
              <ColorPicker size="small" defaultValue={primary} onChange={onChangeColor} />
              <Switch size="small" checked={darkStatus} onChange={onChange} />
            </Header>
            <Content className="h-[calc(100vh-112px)]">
              <div
                className="h-[40px] flex items-end"
                style={{ backgroundColor: colorBgContainer }}>
                <Tabs
                  type="editable-card"
                  hideAdd
                  activeKey={activeKey}
                  defaultActiveKey={defaultSelectedKeys}
                  tabPosition="top"
                  size="small"
                  className="overflow-x-auto overflow-y-hidden w-full flex"
                  items={tabs}
                  onTabClick={(key) => onSelectMenu({ key })}
                  onEdit={onEdit}
                  tabBarExtraContent={operations}
                />
              </div>
              <div className="m-3 h-[calc(100vh-122px)]">
                <Outlet />
              </div>
              {/*  overflow-auto */}
              {/* style={{ backgroundColor: colorBgContainer }} */}
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
};

export default Layouts;
