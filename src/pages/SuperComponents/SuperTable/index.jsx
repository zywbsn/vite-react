import React, { useState } from "react";
import { Space, Modal } from "antd";
import { SuperForm, SuperTable, SuperTags } from "../../../components/index";

const SuperTablePage = () => {
  const [open, setOpen] = useState(false); //控制弹框

  const tagsList = [
    { label: "nice", value: "nice", color: "green" },
    { label: "developer", value: "developer", color: "geekblue" },
    { label: "loser", value: "loser", color: "volcano" },
    { label: "cool", value: "cool", color: "blue" },
    { label: "teacher", value: "teacher", color: "pink" }
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"]
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"]
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"]
    },
    {
      key: "4",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"]
    },
    {
      key: "5",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"]
    },
    {
      key: "6",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"]
    },
    {
      key: "7",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"]
    },
    {
      key: "8",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"]
    },
    {
      key: "9",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"]
    },
    {
      key: "10",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"]
    },
    {
      key: "11",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"]
    }
  ];

  const [dataList, setDataList] = useState(data); //控制弹框
  const columns = [
    {
      title: "msg",
      children: [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          render: (text) => <a>{text}</a>
        },
        {
          title: "Age",
          dataIndex: "age",
          key: "age"
        }
      ]
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          <SuperTags tags={tags} menu={tagsList} />
        </>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      )
    }
  ];

  const formItems = [
    {
      label: "key",
      name: "key",
      placeholder: "input key",
      rules: [{ required: true, message: "input" }]
    },
    {
      label: "name",
      name: "name",
      placeholder: "input name",
      rules: [{ required: true, message: "input" }]
    },
    {
      label: "age",
      name: "age",
      placeholder: "input age",
      rules: [{ required: true, message: "input" }]
    },
    {
      label: "address",
      name: "address",
      placeholder: "input address",
      rules: [{ required: true, message: "input" }]
    },
    {
      label: "tags",
      name: "tags",
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

  const off = () => {
    setOpen(false);
  };

  const onSubmit = (val) => {
    setDataList([val, ...data]);
    off();
  };

  const onAdd = () => {
    setOpen(true);
  };

  return (
    <>
      <SuperTable
        leftButton={{
          custom: false,
          buttonList: [
            {
              text: "新增",
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
          rowKey: "key",
          columns,
          // expandable: {
          //   expandedRowRender: (record) => (
          //     <p
          //       style={{
          //         margin: 0,
          //       }}
          //     >
          //       {record.address}
          //     </p>
          //   ),
          //   rowExpandable: (record) => record.address !== 'Not Expandable',
          // },
          dataSource: dataList
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

export default SuperTablePage;
