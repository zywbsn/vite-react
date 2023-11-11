import React from "react";
import { theme, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const { useToken } = theme;

const UploadFile = (props) => {
  const { file, setFile, listType, children, ...rest } = props;

  const uploadButton = (
    <div>
      {file ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8
        }}>
        Upload
      </div>
    </div>
  );

  const uploadProps = {
    listType,
    maxCount: 1,
    action: "http://localhost:9000/upload",
    beforeUpload: (file) => {
      if (listType === "text") return true;
      setFile(file);
      return false;
    },
    onRemove: () => {
      setFile(null);
    },
    ...rest
  };
  return (
    <>
      <Upload {...uploadProps}>
        {listType === "text" ? children : file ? null : uploadButton}
      </Upload>
    </>
  );
};

export default UploadFile;
