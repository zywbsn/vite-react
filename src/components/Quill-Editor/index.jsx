import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillEditor = ({ value, mode, setValue, style, ...rest }) => {
  const defaultStyle = {
    width: mode === "mobile" ? "375px" : "100%",
    maxHeight: "500px",
    height: "500px",
    overflow: "auto",
    ...style
  };
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // 加粗，斜体，下划线，删除线
    ["blockquote", "code-block"], // 引用，代码块
    [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
    [{ list: "ordered" }, { list: "bullet" }], // 列表
    [{ script: "sub" }, { script: "super" }], // 上下标
    [{ indent: "-1" }, { indent: "+1" }], // 缩进
    [{ direction: "rtl" }], // 文本方向
    [{ size: ["small", false, "large", "huge"] }], // 字体大小
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
    [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
    [{ font: [] }], // 字体
    [{ align: [] }], // 对齐方式
    ["clean"], // 清除字体样式
    ["image", "video"] // 上传图片、上传视频               // remove formatting button
  ];
  //富文本配置
  const options = {
    modules: {
      toolbar: toolbarOptions
    },
    placeholder: "请输入...",
    theme: "snow"
  };

  const onChange = (content, delta, source, editor) => {
    setValue(content, delta, source, editor);
  };
  return (
    <ReactQuill value={value} onChange={onChange} {...options} style={defaultStyle} {...rest} />
  );
};

export default QuillEditor;
