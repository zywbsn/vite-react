import React, { useState } from "react";
import { Space, Modal, Button, message, Popconfirm } from "antd";
import { SuperForm, SuperTable } from "../../../components/index";
import { getUserList, createUser, updateUser, deleteUser } from "../../../api/User/index";
import { getMenuList } from "../../../api/Menu";

const User = () => {
  const [open, setOpen] = useState(false); //控制弹框
  const [menu, setMenu] = useState([]); //菜单
  const [formData, setFormData] = useState({}); //编辑数据
  const [flag, setFlag] = useState(true); //新增编辑
  const [confirmLoading, setConfirmLoading] = useState(false); //删除加载

  const [messageApi, contextHolder] = message.useMessage(); //message 提示

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.rule === "Admin"
    })
  };

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
      console.log(list);
      // setMenu([{ title: "一级路由", value: 0 }, { title: "父级路由", value: 1 }, ...list]);
      setMenu(list);
    });
  };
  React.useEffect(() => getList(), []);

  //表格配置
  const columns = [
    {
      align: "center",
      title: "昵称",
      dataIndex: "nickname",
      key: "nickname",
      search: "input"
    },
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
          <Button type="link" onClick={() => onEdit(record)}>
            编辑
          </Button>
          <Popconfirm
            title="警告"
            description={`是否删除用户 ${record.nickname} ?`}
            onConfirm={() => {
              setConfirmLoading(true);
              deleteUser({ id: record.id }).then(() => {
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
      label: "昵称",
      name: "nickname",
      rules: [{ required: true, message: "请输入" }]
    },
    {
      label: "账号",
      name: "username",
      rules: [{ required: true, message: "请输入" }]
    },
    {
      label: "密码",
      name: "password",
      rules: [{ required: true, message: "请输入" }]
    },
    {
      label: "手机",
      name: "phone"
    },
    {
      label: "权限",
      name: "rule",
      type: "treeSelect",
      config: {
        treeCheckable: true
      },
      rules: [{ required: true, message: "select" }],
      list: menu
    }
  ];

  //编辑
  const onEdit = (row) => {
    const query = { ...row };
    query.rule = query.rule.split(",");
    setFlag(false);
    setFormData(query);
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
      ...val
    };
    flag
      ? createUser(val)
          .then(() => {
            messageApi.success("操作成功");
            tableRef.current.getList();
          })
          .finally(() => off())
      : updateUser(query)
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
          loading: confirmLoading,
          position: {
            total: 85,
            showTotal: (total) => `Total ${total} items`,
            defaultPageSize: 20,
            defaultCurrent: 1
          },
          rowSelection
        }}
      />
      <Modal
        title={`${flag ? "新增" : "编辑"}用户`}
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

export default User;
