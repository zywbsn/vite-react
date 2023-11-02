import React, { useState } from "react";
import { Space, Modal, Button, message } from "antd";
import { SuperForm, SuperTable } from "../../../components/index";
import { getMenuList, setMenu } from "../../../api/Menu/index";

const Menu = () => {
  const [messageApi, contextHolder] = message.useMessage(); //message 提示
  const [open, setOpen] = useState(false); //控制弹框
  const [form, setForm] = useState(null); //编辑数据

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
    }
  ];

  //编辑
  const onEdit = (row) => {
    setForm(row);
    setOpen(true);
  };

  //关闭弹框
  const off = () => {
    setForm(null);
    setOpen(false);
  };

  const tableRef = React.useRef(null);

  //提交
  const onSubmit = (val) => {
    setMenu({ ...form, ...val })
      .then(() => {
        messageApi.success("操作成功");
        tableRef.current.getList();
      })
      .finally(() => off());
  };

  //打开新增
  const onAdd = () => {
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
        title="新增订单"
        centered
        open={open}
        onOk={onSubmit}
        onCancel={off}
        footer={null}
        width={1000}>
        <SuperForm
          formItems={formItems}
          defaultData={form}
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
