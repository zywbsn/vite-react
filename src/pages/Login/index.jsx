import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const Navigate = useNavigate();
  const To = (url) => {
    console.log("To", url);
    Navigate(url);
  };
  return (
    <>
      <h1>Login</h1>
      <Button type='primary' onClick={() => To("/Layout/Home")}>to /Layout/Home</Button>
    </>
  );
};
export default Login;
