import React, { useState } from "react";
import { Space, Modal, Button, message, Popconfirm } from "antd";
import { SuperForm, SuperTable } from "../../../components/index";
import { createMenu, deleteMenu, getMenuList, updateMenu } from "../../../api/Menu/index";
import Icon from "@ant-design/icons";
import * as icons from "@ant-design/icons";

import { useEffect } from "react";
const Menu = () => {
  const [menu, setMenu] = useState([]); //菜单
  const [messageApi, contextHolder] = message.useMessage(); //message 提示
  const [open, setOpen] = useState(false); //控制弹框
  const [confirmLoading, setConfirmLoading] = useState(false); //删除加载
  const [formData, setFormData] = useState({}); //编辑数据
  const [flag, setFlag] = useState(true); //新增编辑

  const getList = () => {
    getMenuList({ page: -1 }).then((response) => {
      const { list } = response.data;
      list.forEach((item) => {
        item.value = item.key;
        item.title = item.label;
        if (item.children) {
          item.children.forEach((i) => {
            i.value = i.key;
            i.title = i.label;
          });
        }
      });

      setMenu([{ title: "一级路由", value: 0 }, { title: "父级路由", value: 1 }, ...list]);
    });
  };

  useEffect(() => getList(), []);

  //表格配置
  const columns = [
    {
      align: "center",
      title: "菜单名称",
      dataIndex: "label",
      key: "label",
      search: "input"
    },
    {
      align: "center",
      title: "路径",
      dataIndex: "key",
      key: "key",
      search: "input"
    },
    {
      align: "center",
      title: "组件地址",
      key: "component",
      dataIndex: "component",
      search: "input"
    },
    {
      align: "center",
      title: "排序",
      key: "sort",
      dataIndex: "sort"
    },
    {
      align: "center",
      title: "图标",
      key: "icon",
      dataIndex: "icon",
      render: (_, record) => {
        console.log("record", record);
        return record.icon ? (
          <Icon component={icons[record.icon]} style={{ marginRight: "8px" }} />
        ) : (
          "--"
        );
      }
    },
    {
      align: "center",
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => onEdit(record)}>
            编辑
          </Button>
          <Popconfirm
            title="警告"
            description={`是否删除菜单 ${record.label} ?`}
            onConfirm={() => {
              setConfirmLoading(true);
              deleteMenu({ id: record.id }).then((response) => {
                messageApi.success("操作成功");
                setConfirmLoading(false);
                tableRef.current.getList();
              });
            }}
            okButtonProps={{
              loading: confirmLoading
            }}>
            <Button danger type="link">
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  //表单配置
  const formItems = [
    {
      label: "菜单名称",
      name: "label",
      rules: [{ required: true, message: "input" }]
    },
    {
      label: "路径",
      name: "key",
      rules: [{ required: true, message: "input" }]
    },
    {
      label: "组件地址",
      name: "component"
    },
    {
      label: "上级路由",
      name: "father",
      type: "treeSelect",
      list: menu
    },
    {
      label: "图标",
      name: "icon",
      type: "iconSelect"
    },
    {
      label: "排序",
      name: "sort",
      type: "input",
      placeholder: "请输入"
    }
  ];

  //编辑
  const onEdit = (row) => {
    setFlag(false);
    setFormData(row);
    setOpen(true);
  };
  const formRef = React.useRef(null);
  //关闭弹框
  const off = () => {
    setFormData({});
    formRef.current.resetFields();
    setOpen(false);
  };

  const tableRef = React.useRef(null);

  //提交
  const onSubmit = (val) => {
    const query = {
      ...formData,
      ...val,
      is_father: val.father === 1 ? 1 : 0
    };

    flag
      ? createMenu(query)
          .then(() => {
            messageApi.success("操作成功");
            tableRef.current.getList();
          })
          .finally(() => off())
      : updateMenu(query)
          .then(() => {
            messageApi.success("操作成功");
            tableRef.current.getList();
          })
          .finally(() => off());
  };

  //打开新增
  const onAdd = () => {
    setFlag(true);
    setOpen(true);
  };

  return (
    <>
      {contextHolder}
      <SuperTable
        ref={tableRef}
        request={getMenuList}
        leftButton={{
          custom: false,
          buttonList: [
            {
              text: "新增",
              buttonConfig: {
                type: "primary"
              },
              methods: { onClick: () => onAdd() }
            }
          ]
        }}
        tableConfig={{
          rowKey: "id",
          columns,
          loading: confirmLoading,
          // rowSelection,
          dataSource: [{ 1: 1 }]
        }}
      />
      <Modal
        title={`${flag ? "新增" : "编辑"}菜单`}
        centered
        open={open}
        onOk={onSubmit}
        onCancel={off}
        footer={null}
        maskClosable={false}
        width={1000}>
        <SuperForm
          ref={formRef}
          formItems={formItems}
          defaultData={formData}
          double={true}
          formConfig={{ colon: true }}
          submitMethod={onSubmit}
          leftBtn={[
            {
              text: "取消",
              buttonConfig: {
                type: "text"
              },
              methods: { onClick: () => off() }
            }
          ]}
        />
      </Modal>
    </>
  );
};

export default Menu;
