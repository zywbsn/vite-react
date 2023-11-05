import React from "react";
import { message } from "antd";

const AuthToken = ({ type, msg }) => {
  const [messageApi, contextHolder] = message.useMessage();

  React.useEffect(() => messageApi.error(msg), [msg]);

  return <div>{contextHolder}</div>;
};

export default AuthToken;
