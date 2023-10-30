import React from 'react';
import { Form, Input, Radio, Select, DatePicker } from 'antd';
import { SuperButton } from "../index";
import dayjs from "dayjs";

const Item = (props) => {
  const { items, search } = props;
  return items.map((item) => {
    return (
      <Form.Item
        style={{
          width: search ? "25%" : "50%",
        }}
        key={item.name}
        label={item.label}
        name={item.name}
        rules={item.rules}
        initialValue={item.type === "radio" ? item.list[0].value : item.mode === "multiple" ? [] : ""}
      >
        {item.type === "radio" ?
          <Radio.Group options={item.list} />
          : item.type === "select" ?
            <Select
              mode={item.mode}
              // defaultValue={[]}
              placeholder={item.placeholder}
              options={item.list}
            />
            : item.type === "date" ?
              <DatePicker format="YYYY-MM-DD" className="w-full" />
              :
              <Input placeholder={item.placeholder} />
        }
      </Form.Item>
    )
  });
};


const SuperForm = (props) => {
  const [form] = Form.useForm();
  const { formItems, formConfig, search, double, submitMethod, leftBtn, rightBtn } = props;


  //按钮列表
  const btnList = [
    ...leftBtn || [],
    {
      text: "重置",
      buttonConfig: {
        type: "default"
      },
      methods: { onClick: () => onReset() }
    },
    {
      className: "mr-0",
      text: "提交",
      buttonConfig: {
        type: "primary"
      },
      methods: { onClick: () => onSubmit() }
    },
    ...rightBtn || []
  ];

  //提交表单
  const onSubmit = async () => {
    const values = await form.validateFields();
    formItems.map((item) => {
      if (item.type === "date") {
        values[item.name] = dayjs(values[item.name].$d).format("YYYY-MM-DD");
      }
    });
    submitMethod(values);//传给父组件
  };

  //重置表单
  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Form
        form={form}
        labelCol={{
          span: search ? 6 : 4,
        }}
        wrapperCol={{
          span: search ? 24 : 24,
        }}
        {...formConfig}
        // className={search ? "flex flex-wrap" : ""}
        style={!double || {
          display: "flex",
          flexWrap: "wrap",
          width: "100%"
        }}

      >
        <Item items={formItems} search={search} />
      </Form>
      <div className={double ? "w-full text-right" : "w-1/2 text-right"}>
        {btnList.map((item) => (
          <React.Fragment key={item.text}>
            <SuperButton {...item} />
          </React.Fragment>
        ))}
      </div>
    </>
  )
};

export default SuperForm;