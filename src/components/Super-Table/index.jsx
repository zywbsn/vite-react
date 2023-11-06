import React from "react";
import { Table, theme } from "antd";
import { SuperButton, SuperForm } from "../index";

const { useToken } = theme;

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
  const { tableConfig, leftButton, request } = props;
  const { token } = useToken();
  const [tableData, setTableData] = React.useState([]);
  const [listPage, setListPage] = React.useState({
    page: 1,
    size: 10,
    total: 0
  });
  !request || delete tableConfig.dataSource;
  const { dataSource } = tableConfig;

  const [listQuery, setListQuery] = React.useState({ page: 1, size: 10 });

  const getList = (query) => {
    const newQuery = !query ? { page: 1, size: 10 } : { ...listQuery, ...query };
    setListQuery(newQuery);
    request(newQuery).then((response) => {
      const { list, page = 1, size = 10, total = 0 } = response.data;
      setListPage({
        page,
        size,
        total
      });
      list.map((item) => {
        for (let key in item) {
          if (key === "icon") return;
          item[key] = item[key] === 0 || !item[key] ? "--" : item[key];
        }
      });
      setTableData(list);
    });
  };

  React.useEffect(() => {
    request ? getList() : setTableData(dataSource);
  }, []);
  const searchForm = tableConfig.columns.filter((item) => item.search);

  searchForm.map((item) => {
    item.label = item.title;
    item.name = item.key;
    item.type = item.search;
  });
  const search = searchForm.length > 0;
  if (search) {
    const itemNum = searchForm.length % 4;
    if (itemNum !== 3) {
      for (let index = 0; index < 3 - itemNum; index++) {
        searchForm.push({ empty: true, key: index });
      }
    }
  }

  const FormRef = React.useRef(null); //form 表单 ref

  //向父组件暴露方法
  React.useImperativeHandle(ref, () => ({ getList, FormRef }));

  const onChange = (page, pageSize) => {
    getList({ page: page, size: pageSize });
  };

  return (
    <>
      {search ? (
        <div
          className="p-3 pb-0 r rounded-md h-auto mb-3"
          style={{ backgroundColor: token.colorBgContainer }}>
          <SuperForm
            ref={FormRef}
            formItems={searchForm}
            search={getList}
            double={false}
            formConfig={{ colon: true }}
          />
        </div>
      ) : null}

      <div
        className="p-3 pb-0 r rounded-md h-[calc(100%-68px)]"
        style={{
          backgroundColor: token.colorBgContainer
        }}>
        {/* h-[calc(100%-152px)] */}
        <div className="mb-3">
          <ButtonList {...leftButton} />
        </div>
        <Table
          rowKey="id"
          bordered
          size="middle"
          scroll={{
            scrollToFirstRowOnChange: true,
            y: "100%"
          }}
          dataSource={tableData}
          pagination={{
            total: listPage.total,
            showTotal: () => `共 ${listPage.total} 条`,
            defaultPageSize: listPage.size,
            defaultCurrent: listPage.page,
            onChange
          }}
          {...tableConfig}
        />
      </div>
    </>
  );
});

export default SuperTable;
