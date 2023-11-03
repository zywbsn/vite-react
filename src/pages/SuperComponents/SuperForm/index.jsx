import React, { useEffect } from "react";
import { SuperForm } from "../../../components";
import { theme, notification } from "antd";

const { useToken } = theme;
const SuperFormPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const { token } = useToken();
  const [formData, setFormData] = React.useState({}); //编辑数据
  const formRef = React.useRef(null);
  const searchFormRef = React.useRef(null); //form 表单 ref
  const searchForm = [
    {
      align: "center",
      title: "菜单名称",
      dataIndex: "label",
      key: "label",
      search: "input",
      label: "菜单名称",
      name: "label",
      type: "input"
    },
    {
      align: "center",
      title: "路径",
      dataIndex: "key",
      key: "key",
      search: "input",
      label: "路径",
      name: "key",
      type: "input"
    },
    {
      align: "center",
      title: "组件地址",
      key: "component",
      dataIndex: "component",
      search: "input",
      label: "组件地址",
      name: "component",
      type: "input"
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
      label: "上级路由",
      name: "father",
      type: "treeSelect",
      placeholder: "select age",
      list: [
        { value: 1, label: "1" },
        { value: 2, label: "2" }
      ]
    },
    {
      label: "排序",
      name: "sort",
      type: "input",
      placeholder: "请输入"
    }
  ];

  const onSubmit = (val) => {
    console.log("提交数据", val);
    api.open({
      message: "提交数据",
      description: `提交数据 : ${JSON.stringify(val)}`,
      duration: 3
    });
  };

  const getList = (query) => {
    console.log("搜索参数", query);
    api.open({
      message: "搜索参数",
      description: `搜索参数 : ${JSON.stringify(query)}`,
      duration: 3
    });
  };

  return (
    <>
      {contextHolder}
      <div className="main" style={{ backgroundColor: token.colorBgContainer }}>
        <h1>表单类 form</h1>
        <SuperForm
          ref={formRef}
          formItems={formItems}
          defaultData={formData}
          double={true}
          formConfig={{ colon: true }}
          submitMethod={onSubmit}
        />

        <h1>搜索类 form</h1>
        <SuperForm
          ref={searchFormRef}
          formItems={searchForm}
          search={getList}
          double={false}
          formConfig={{ colon: true }}
        />
      </div>
    </>
  );
};

export default SuperFormPage;
