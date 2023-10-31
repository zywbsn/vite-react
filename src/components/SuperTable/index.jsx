import React from "react";
import { Table } from "antd";
import { SuperButton, SuperForm } from "../index";

const ButtonList = (props) => {
  const { buttonList, custom } = props;
  if (!custom) {
    const Items = buttonList.map((item) => (
      <React.Fragment key={item.text}>
        <SuperButton {...item} />
      </React.Fragment>
    ));
    return Items;
  }
};
const SuperTable = React.forwardRef((props, ref) => {
  const [tableData, setTableData] = React.useState([]);
  const { tableConfig, leftButton, request } = props;
  const { dataSource } = tableConfig;

  const getList = () => {
    delete tableConfig.dataSource;
    request({ page: 1, size: 10 }).then((res) => {
      setTableData(res.data.list);
    });
  };

  React.useEffect(() => {
    request ? getList() : setTableData(dataSource);
  }, []);
  const searchForm = tableConfig.columns.filter((item) => item.search);
  const search = searchForm.length > 0;
  searchForm.map((item) => {
    item.label = item.title;
    item.name = item.key;
    item.type = item.search;
  });

  const FormRef = React.useRef(null); //form 表单 ref

  //向父组件暴露方法
  React.useImperativeHandle(ref, () => ({ getList, FormRef }));

  return (
    <>
      {search ? (
        <SuperForm
          ref={FormRef}
          formItems={searchForm}
          search={true}
          double={false}
          formConfig={{ colon: true }}
        />
      ) : null}

      <div className="mb-3">
        <ButtonList {...leftButton} />
      </div>
      <Table
        rowKey="id"
        bordered
        size="middle"
        scroll={{
          y: 500
        }}
        dataSource={tableData}
        {...tableConfig}
      />
    </>
  );
});

export default SuperTable;
