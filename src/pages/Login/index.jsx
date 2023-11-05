import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { Login } from "../../api/Login/index";

const LoginPage = () => {
  const [form] = Form.useForm();

  const Navigate = useNavigate();

  const onReset = () => {
    form.resetFields();
  };

  const onLogin = async () => {
    const values = await form.validateFields();
    Login(values).then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_info", JSON.stringify(response.data.info));
        Navigate("/Home", { replace: true });
      }
    });
  };

  return (
    <>
      <div className="w-screen h-screen  flex items-center justify-center">
        <div className="bg-red-100 p-6 rounded-lg">
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 8
            }}
            wrapperCol={{
              span: 16
            }}
            style={{
              maxWidth: 600
            }}
            initialValues={{
              remember: true
            }}
            autoComplete="off">
            <Form.Item label="账号" name="username">
              <Input />
            </Form.Item>

            <Form.Item label="密码" name="password">
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16
              }}>
              <Button type="primary" onClick={onLogin}>
                登录
              </Button>
              <Button className="ml-3" type="default" onClick={onReset}>
                重置
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
