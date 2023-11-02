import React, { useState } from "react";
import { Space, Modal, Button, message } from "antd";
import { SuperForm, SuperTable } from "../../../components/index";
import { createMenu, getMenuList, updateMenu } from "../../../api/Menu/index";

import { useEffect } from "react";
const Menu = () => {
  const [menu, setMenu] = useState([]); //菜单
  const [messageApi, contextHolder] = message.useMessage(); //message 提示
  const [open, setOpen] = useState(false); //控制弹框
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

      setMenu([{ title: "无", value: 0 }, ...list]);
    });
  };

  useEffect(() => getList(), []);

  //表格配置
  const columns = [
    {
      align: "center",
      title: "菜单名称",
      dataIndex: "label",
      key: "label"
    },
    {
      align: "center",
      title: "路径",
      dataIndex: "key",
      key: "key"
    },
    {
      align: "center",
      title: "组件地址",
      key: "component",
      dataIndex: "component"
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
          <Button danger type="link" onClick={() => onDelete(record)}>
            删除
          </Button>
        </Space>
      )
    }
  ];

  //表单配置
  const formItems = [
    {
      label: "菜单名称",
      name: "label",
      placeholder: "input key",
      rules: [{ required: true, message: "input" }]
    },
    {
      label: "路径",
      name: "key",
      placeholder: "input name",
      rules: [{ required: true, message: "input" }]
    },
    {
      label: "组件地址",
      name: "component",
      placeholder: "input key"
    },
    {
      label: "父路由",
      name: "father",
      type: "treeSelect",
      placeholder: "select age",
      list: menu
    }
  ];

  //删除
  const onDelete = (row) => {
    console.log(row);
    tableRef.current.getList();
  };

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
      is_father: val.father === 0 ? 0 : 1,
      father: val.father === 0 ? "" : val.father
    };
    console.log("query", query);

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
        search={false}
        leftButton={{
          custom: false,
          buttonList: [
            {
              text: "新增",
              buttonConfig: {
                type: "primary"
              },
              methods: { onClick: () => onAdd() }
            },
            {
              text: "SuperButton2",
              buttonConfig: {
                type: "primary"
              },
              methods: { onClick: () => console.log("SuperButton2") }
            }
          ]
        }}
        tableConfig={{
          rowKey: "id",
          columns
          // rowSelection,
          // dataSource: dataList
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
