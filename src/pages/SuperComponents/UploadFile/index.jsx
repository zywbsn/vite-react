import React from "react";
import { theme, Button, message, Upload } from "antd";
import { UploadOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { UploadFn } from "../../../api/Common";
import UploadFile from "../../../components/Upload-File";

const { useToken } = theme;

const UploadFilePage = () => {
  const { token } = useToken();
  const [file, setFile] = React.useState();

  const onChange = (value) => {
    setFile(value);
  };

  return (
    <>
      <div className="main" style={{ backgroundColor: token.colorBgContainer }}>
        <UploadFile listType="picture-circle" file={file} setFile={onChange} />
        <p>头像类型上传点击上传时发起上传请求</p>
        <Button
          onClick={() => {
            UploadFn({ file })
              .then((response) => {
                console.log(response);
                message.success("操作成功");
              })
              .catch((error) => {
                console.log("error", error);
              });
          }}
          icon={<UploadOutlined />}>
          上传
        </Button>
        <br />
        <br />
        <br />
        <br />
        <UploadFile listType="text">
          <Button icon={<UploadOutlined />}>上传图片</Button>
        </UploadFile>
      </div>
    </>
  );
};

export default UploadFilePage;
