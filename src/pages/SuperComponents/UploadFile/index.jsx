import React from "react";
import { theme, Button, message, Upload } from "antd";
import { UploadOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const { useToken } = theme;

const UploadFile = () => {
  const { token } = useToken();
  const [imageUrl, setImageUrl] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [fileInfo, setFileInfo] = React.useState();
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8
        }}>
        Upload
      </div>
    </div>
  );
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const props = {
    listType: "picture-card",
    maxCount: 1,
    beforeUpload: (file) => {
      setFileInfo(file);
      return false;
    },
    onRemove: () => {
      setFileInfo(null);
    }
  };
  return (
    <>
      <div className="main" style={{ backgroundColor: token.colorBgContainer }}>
        <Upload {...props}>
          {/* <Button icon={<UploadOutlined />}>Click to Upload</Button> */}
          {fileInfo ? null : uploadButton}
        </Upload>
        <div>/SuperComponents/UploadFile</div>
      </div>
    </>
  );
};
export default UploadFile;
