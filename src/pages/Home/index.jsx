import { useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import SuperButton from "../../components/SuperButton/index";
import SuperForm from "../../components/SuperForm/index";

const Home = () => {
  const [count, setCount] = useState(1);
  const [formData, setFormDate] = useState({});
  const changeCount = () => {
    setCount(count + 1);
  };

  const onSubmit = (value) => {
    setFormDate(value);
  };
  return (
    <>
      <div>Home</div>
      <h1>{count}</h1>
      <h1>{formData.name}</h1>
      <SuperButton
        text="SuperButton"
        tooltipStatus={true}
        tooltipConfig={{
          title: "tooltipConfig",
          placement: "topLeft",
          arrow: { pointAtCenter: true }
        }}
        buttonConfig={{
          type: "primary",
          danger: true,
          ghost: true,
          shape: "circle",
          icon: <HomeOutlined />,
          style: { color: "green", backgroundColor: "red", borderColor: "#333" }
        }}
        methods={{ onClick: () => changeCount() }}
      />
      <SuperButton
        text="SuperButton111"
        tooltipStatus={true}
        tooltipConfig={{
          title: "tooltipConfig",
          placement: "topLeft",
          arrow: { pointAtCenter: true }
        }}
        buttonConfig={{
          type: "primary",
          danger: true,
          ghost: true,
          style: { color: "green", backgroundColor: "red", borderColor: "#333" }
        }}
        methods={{ onClick: () => changeCount() }}
      />
      <div>
        <SuperForm
          formItems={[
            {
              label: "name",
              name: "name",
              placeholder: "input name",
              rules: [{ required: true, message: "input" }]
            },
            {
              label: "age",
              name: "age",
              type: "select",
              placeholder: "select age",
              list: [
                { value: 1, label: "18以下" },
                { value: 2, label: "18-23" },
                { value: 3, label: "24-32" }
              ]
            },
            {
              label: "sex",
              name: "sex",
              type: "radio",
              rules: [{ required: true, message: "radio" }],
              list: [
                { value: 1, label: "男" },
                { value: 2, label: "女" }
              ]
            },
            {
              label: "birthday",
              name: "birthday",
              placeholder: "select birthday",
              type: "date",
              rules: [{ required: true, message: "date" }]
            }
          ]}
          // search={true}
          double={true}
          formConfig={{ colon: true }}
          submitMethod={onSubmit}
        />
      </div>
    </>
  );
};
export default Home;
