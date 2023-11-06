import React from "react";
import QuillEditor from "../../../components/Quill-Editor";

const RichText = () => {
  const [value, setValue] = React.useState("");
  const onChange = (content, delta, source, editor) => {
    // console.log("content", content);
    // console.log("delta", delta);
    // console.log("source", source);
    // console.log("editor", editor);
    setValue(content);
  };
  return (
    <>
      <div className="main">
        <QuillEditor theme="snow" value={value} setValue={onChange} />
        <div dangerouslySetInnerHTML={{ __html: value }} />
      </div>
    </>
  );
};

export default RichText;
