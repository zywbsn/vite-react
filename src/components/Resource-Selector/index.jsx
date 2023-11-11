import React from "react";
import { Layout, Modal, Image, Button, theme } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getImages } from "../../api/Common";

const { Header, Footer, Sider, Content } = Layout;
const { useToken } = theme;
const ResourceSelector = () => {
  const { token } = useToken();
  const [open, setOpen] = React.useState(false);
  const [imageList, setImageList] = React.useState([]);
  const BASEURL = import.meta.env.VITE_APP_BASE_URL + "/";
  const getImageList = () => {
    console.log("token.colorBgContainer", token.colorBgLayout);
    getImages({}).then((response) => {
      console.log("response", response);
      setImageList(response.data.list);
    });
  };

  React.useEffect(() => getImageList(), []);

  const headerStyle = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 50,
    lineHeight: "64px",
    backgroundColor: "#7dbcea"
  };
  const contentStyle = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#108ee9"
  };
  const siderStyle = {
    textAlign: "center",
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#3ba0e9"
  };
  const footerStyle = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#7dbcea"
  };
  return (
    <>
      <div
        style={{
          border: `1px dashed ${token.colorTextBase}`,
          backgroundColor: token.colorBgLayout
        }}
        className="w-[148px] h-[148px] rounded-lg  flex items-center justify-center"
        onClick={() => setOpen(true)}>
        {/* <Button type="primary" size="large" icon={<PlusOutlined />} /> */}
        <PlusOutlined className="text-4xl" style={{ color: token.colorTextBase }} />
      </div>
      <Modal
        title={`选择资源`}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={null}
        maskClosable={false}
        width={"70%"}>
        <Layout className="h-[80%]">
          <Header style={headerStyle}>Header</Header>
          <Layout hasSider style={{ backgroundColor: token.colorBgLayout }}>
            <Sider style={siderStyle}>Sider</Sider>
            <Content>
              {/* BASEURL */}
              <div className="p-3 h-[100%] grid grid-cols-5 gap-4">
                {imageList.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="p-3 rounded-lg h-[230px]"
                      style={{ backgroundColor: token.colorBgContainer }}>
                      <Image className="h-[148px] w-[148px] " src={BASEURL + item} />
                      <div>{item}</div>
                    </div>
                  );
                })}
              </div>
              {/* <div className="p-3 h-[100%] grid grid-cols-5 gap-4">
                <div className="p-3 bg-red-900 h-[230px]">
                  <img className="h-[90%] w-full " src="../../../public/vite.svg" />
                  <div>文件名文件名文件名</div>
                </div>
              </div> */}
            </Content>
          </Layout>
          <Footer style={footerStyle}>Footer</Footer>
        </Layout>
      </Modal>
    </>
  );
};

export default ResourceSelector;
