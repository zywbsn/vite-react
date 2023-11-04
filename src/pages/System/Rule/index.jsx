import React, { useState } from "react";
import { Space, Modal, Button } from "antd";
import { SuperForm, SuperTable, SuperTags } from "../../../components/index";

const Rule = () => {
  const [open, setOpen] = useState(false); //控制弹框
  const [dataList, setDataList] = useState([
    {
      id: 1,
      name: "超级管理员",
      mark: "admin",
      content: "系统管理"
    },
    {
      id: 2,
      name: "游客",
      mark: "user",
      content:
        "系统管理系统管理系统管理系统管理系统管理系统管理系统管理系统管理系统管理系统管理系统管理系统管理系统管理系统管理系统管理系统管理系统管理系统管理系统管理系统管理系统管理系统管理系统管理系统管理系统管理"
    },
    {
      id: 3,
      name: "浏览者",
      mark: "visitor",
      content: "系统管理"
    },
    {
      id: 4,
      name: "浏览者",
      mark: "visitor",
      content: "系统管理"
    },
    {
      id: 5,
      name: "浏览者",
      mark: "visitor",
      content: "系统管理"
    },
    {
      id: 6,
      name: "浏览者",
      mark: "visitor",
      content: "系统管理"
    },
    {
      id: 7,
      name: "浏览者",
      mark: "visitor",
      content: "系统管理"
    },
    {
      id: 8,
      name: "浏览者",
      mark: "visitor",
      content: "系统管理"
    }
  ]); //表格数据

  //表格配置
  const columns = [
    {
      title: "权限名称",
      dataIndex: "name",
      key: "name",
      search: "input"
    },
    {
      title: "权限标志",
      dataIndex: "mark",
      key: "mark",
      search: "input"
    },
    {
      title: "权限内容",
      dataIndex: "content",
      key: "content",
      search: "select"
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button disabled={record.mark === "admin"} type="link">
            添加权限
          </Button>
        </Space>
      )
    }
  ];

  //新增表单配置
  const formItems = [
    {
      label: "权限名称",
      name: "name",
      placeholder: "input key",
      rules: [{ required: true, message: "input" }]
    },
    {
      label: "权限标志",
      name: "mark",
      placeholder: "input name",
      rules: [{ required: true, message: "input" }]
    },
    {
      label: "权限内容",
      name: "content",
      type: "select",
      config: { mode: "multiple" },
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
    setDataList([val, ...dataList]);
    off();
  };

  //打开新增权限
  const onAdd = () => {
    setOpen(true);
  };

  const tableRef = React.useRef();
  const onRef = () => {
    console.log("tableRef", tableRef.current);
    tableRef.current.getList();
  };
  return (
    <>
      <SuperTable
        ref={tableRef}
        leftButton={{
          custom: false,
          buttonList: [
            {
              text: "新增权限",
              tooltipStatus: true,
              tooltipConfig: {
                title: "tooltipConfig",
                placement: "topLeft",
                arrow: { pointAtCenter: true }
              },
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
          columns,
          dataSource: dataList
        }}
      />
      <Modal
        title="新增权限"
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
