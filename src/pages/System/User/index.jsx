import React, { useState } from "react";
import { Space, Modal, Button } from "antd";
import { SuperForm, SuperTable } from "../../../components/index";
import { getUserList } from "../../../api/User/index";

const Rule = () => {
  const [open, setOpen] = useState(false); //控制弹框

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.rule === "Admin"
    })
  };

  //表格配置
  const columns = [
    // {
    //   align: "center",
    //   title: "昵称",
    //   dataIndex: "nickname",
    //   key: "nickname",
    //   search: "input"
    // },
    {
      align: "center",
      title: "用户名",
      dataIndex: "username",
      key: "username",
      search: "input"
    },
    {
      align: "center",
      title: "权限",
      dataIndex: "rule",
      key: "rule"
    },
    {
      align: "center",
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button disabled={record.mark === "admin"} type="link">
            编辑信息
          </Button>
        </Space>
      )
    }
  ];

  //表单配置
  const formItems = [
    {
      label: "昵称",
      name: "nickname",
      placeholder: "input key",
      rules: [{ required: true, message: "input" }]
    },
    {
      label: "账号",
      name: "username",
      placeholder: "input name",
      rules: [{ required: true, message: "input" }]
    },
    {
      label: "权限",
      name: "rule",
      type: "select",
      mode: "multiple",
      rules: [{ required: true, message: "select" }],
      list: [
        { value: "loser", label: "loser" },
        { value: "cool", label: "cool" },
        { value: "teacher", label: "teacher" }
      ]
    }
  ];

  //关闭弹框
  const off = () => {
    setOpen(false);
  };

  //提交
  const onSubmit = (val) => {
    off();
  };

  //打开新增
  const onAdd = () => {
    setOpen(true);
  };

  return (
    <>
      <SuperTable
        request={getUserList}
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
            }
            // {
            //   text: "SuperButton2",
            //   buttonConfig: {
            //     type: "primary"
            //   },
            //   methods: { onClick: () => console.log("SuperButton2") }
            // }
          ]
        }}
        tableConfig={{
          rowKey: "id",
          columns,
          rowSelection
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

export default Rule;
