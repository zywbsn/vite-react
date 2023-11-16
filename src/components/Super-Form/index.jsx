import React, { useEffect } from "react";
import { Form, Input, Radio, Select, DatePicker, Cascader, TreeSelect } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { SuperButton } from "../index";
import dayjs from "dayjs";
import SelectIcon from "../Select-Icon";
const Item = (props) => {
  const { items, search, flag } = props;

  return items.map((item, index) => {
    if (flag && search && index > 2) {
      return null;
    }
    const space = JSON.stringify(item) === "{}";

    return space ? (
      <Form.Item />
    ) : !item.empty ? (
      <Form.Item
        key={item.name}
        label={item.label}
        name={item.name}
        rules={item.rules}
        labelAlign="right"
        labelCol={{
          span: "6"
        }}
        initialValue={
          item.type === "radio"
            ? item.list[0].value
            : item.type === "treeSelect" && !item.config?.treeCheckable
            ? item.list[0].value
            : item.config?.mode === "multiple" || item.config?.treeCheckable
            ? []
            : undefined
        }>
        {item.type === "radio" ? (
          <Radio.Group {...item.config} options={item.list} />
        ) : item.type === "select" ? (
          <Select {...item.config} placeholder={item.placeholder ?? "请选择"} options={item.list} />
        ) : item.type === "date" ? (
          <DatePicker
            {...item.config}
            placeholder={item.placeholder ?? "请选择"}
            format="YYYY-MM-DD"
            className="w-full"
          />
        ) : item.type === "cascader" ? (
          <Cascader
            {...item.config}
            placeholder={item.placeholder ?? "请选择"}
            options={item.list}
          />
        ) : item.type === "treeSelect" ? (
          <TreeSelect
            {...item.config}
            placeholder={item.placeholder ?? "请选择"}
            treeData={item.list}
          />
        ) : item.type === "iconSelect" ? (
          <SelectIcon placeholder={item.placeholder ?? "请选择"} />
        ) : (
          <Input {...item.config} placeholder={item.placeholder ?? "请输入"} />
        )}
      </Form.Item>
    ) : (
      <Form.Item key={item.key} />
    );
  });
};

const SuperForm = React.forwardRef((props, ref) => {
  const [flag, setFlag] = React.useState(true);
  const [form] = Form.useForm();
  const { formItems, formConfig, search, double, submitMethod, leftBtn, rightBtn, defaultData } =
    props;

  useEffect(() => {
    form.setFieldsValue(defaultData);
  }, [defaultData]);

  //按钮列表
  const btnList = [
    ...(leftBtn || []),
    // {
    //   text: "重置",
    //   buttonConfig: {
    //     type: "default"
    //   },
    //   methods: { onClick: () => onReset() }
    // },
    {
      className: "mr-0",
      text: "提交",
      buttonConfig: {
        type: "primary"
      },
      methods: { onClick: () => onSubmit() }
    },
    ...(rightBtn || [])
  ];

  //搜索
  const onSearch = async () => {
    const values = await form.validateFields();
    formItems.map((item) => {
      if (item.type === "date") {
        values[item.name] = dayjs(values[item.name].$d).format("YYYY-MM-DD");
      }
    });
    search(values);
  };

  //提交表单
  const onSubmit = async () => {
    const values = await form.validateFields();
    formItems.map((item) => {
      if (item.type === "date") {
        values[item.name] = dayjs(values[item.name].$d).format("YYYY-MM-DD");
      }
    });
    const query = { ...values };
    for (const key in query) {
      if (query[key] === undefined || query[key] === null) query[key] = "";
    }
    submitMethod(query); //传给父组件
    form.resetFields();
  };

  const resetSearch = () => {
    form.resetFields();
    search(false);
  };

  //重置表单
  const onReset = () => {
    search ? resetSearch() : form.setFieldsValue(defaultData);
  };

  return (
    <>
      <Form
        ref={ref}
        form={form}
        {...formConfig}
        className={double ? `grid grid-cols-2 gap-x-4` : "grid grid-cols-4"}>
        <Item flag={flag} search={search ? true : search} items={formItems} />
        {search ? (
          <Form.Item>
            <SuperButton
              className="ml-4"
              text="搜索"
              buttonConfig={{
                type: "primary"
              }}
              methods={{ onClick: () => onSearch() }}
            />
            <SuperButton
              text="重置"
              buttonConfig={{
                type: "default"
              }}
              methods={{ onClick: () => onReset() }}
            />
            {formItems.length > 3 ? (
              <SuperButton
                text={flag ? "展开" : "收起"}
                buttonConfig={{
                  type: "text",
                  icon: flag ? (
                    <CaretDownOutlined style={{ fontSize: "14px" }} />
                  ) : (
                    <CaretUpOutlined style={{ fontSize: "14px" }} />
                  )
                }}
                methods={{ onClick: () => setFlag(!flag) }}
              />
            ) : null}
          </Form.Item>
        ) : null}
      </Form>
      {search ? null : (
        <div className={double ? "w-full text-right" : "w-1/2 text-right"}>
          {btnList.map((item) => (
            <React.Fragment key={item.text}>
              <SuperButton {...item} />
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
});

export default SuperForm;
