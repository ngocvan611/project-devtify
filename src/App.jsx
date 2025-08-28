import { Button, message, Table } from "antd";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { InputEdit } from "./components/InputEdit";
import { randomDateTime, randomState } from "./utils";
import { FormAdd } from "./components/FormAdd";

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const [rowEdit, setRowEdit] = useState(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [open, setOpen] = useState(false);

  const getListData = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://microsoftedge.github.io/Demos/json-dummy-data/5MB.json",
        {
          params: { page: page, limit: 10 },
        },
      );
      if (res?.status === 200) {
        const newData = res?.data?.map((item, index) => {
          const ver = parseFloat(item.version);
          return {
            ...item,
            key: page * 10 + index + 1,
            state: randomState(),
            date: randomDateTime(),
            version:
              ver <= 2.5
                ? "new customer"
                : ver <= 5
                ? "pause"
                : ver <= 7.5
                ? "to contact"
                : ver <= 10
                ? "served"
                : null,
          };
        });
        if (newData.length === 0) {
          setHasMore(false);
        }
        setData((prev) => [...prev, ...newData]);
      } else {
        messageApi.error(res?.message);
      }
    } catch (error) {
      console.log(error);
      messageApi.info(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListData(page);
  }, [page]);

  const columns = [
    {
      title: "key",
      dataIndex: "key",
      width: 60,
    },
    {
      title: "id",
      dataIndex: "id",
      width: 150,
      render: (value, row) => (
        <InputEdit
          edit={rowEdit === row.key}
          defaultValue={value}
          record={row}
          field="id"
          setData={setData}
          setRowEdit={setRowEdit}
        />
      ),
    },
    {
      title: "blod",
      dataIndex: "bio",
      width: 300,
      render: (value, row) => (
        <InputEdit
          edit={rowEdit === row.key}
          defaultValue={value}
          record={row}
          field="bio"
          setData={setData}
          setRowEdit={setRowEdit}
        />
      ),
    },
    {
      title: "name",
      dataIndex: "name",
      width: 100,
      render: (value, row) => (
        <InputEdit
          edit={rowEdit === row.key}
          defaultValue={value}
          record={row}
          field="name"
          setData={setData}
          setRowEdit={setRowEdit}
        />
      ),
    },
    {
      title: "language",
      dataIndex: "language",
      width: 100,
      render: (value, row) => (
        <InputEdit
          edit={rowEdit === row.key}
          defaultValue={value}
          record={row}
          field="language"
          setData={setData}
          setRowEdit={setRowEdit}
        />
      ),
    },
    {
      title: "version",
      dataIndex: "version",
      width: 100,
      render: (value, row) => (
        <InputEdit
          edit={rowEdit === row.key}
          defaultValue={value}
          record={row}
          field="version"
          setData={setData}
          setRowEdit={setRowEdit}
        />
      ),
    },
    {
      title: "State",
      dataIndex: "state",
      width: 70,
      sorter: (a, b) => a.state.localeCompare(b.state),
      render: (value, row) => (
        <InputEdit
          edit={rowEdit === row.key}
          defaultValue={value}
          record={row}
          field="state"
          setData={setData}
          setRowEdit={setRowEdit}
        />
      ),
    },
    {
      title: "Create Date",
      dataIndex: "date",
      width: 100,
      render: (value, row) => (
        <InputEdit
          edit={rowEdit === row.key}
          defaultValue={value}
          record={row}
          field="date"
          setData={setData}
          setRowEdit={setRowEdit}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 70,
      render: (_, row) => {
        return (
          <Button icon={<EditOutlined />} onClick={() => setRowEdit(row.key)}>
            Edit
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <div className="m-8 flex flex-col gap-2">
        {contextHolder}
        <Button
          className="w-fit ml-auto"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          Add row
        </Button>
        <div className="border rounded-lg">
          <Table
            bordered
            loading={loading}
            dataSource={data}
            columns={columns}
            size="small"
            pagination={false}
            scroll={{
              y: 600,
            }}
            virtual
            rowKey="key"
            onScroll={(e) => {
              const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
              if (
                scrollHeight - scrollTop === clientHeight &&
                hasMore &&
                !loading
              ) {
                const nextPage = page + 1;
                setPage(nextPage);
              }
            }}
            footer={() =>
              !rowEdit && (
                <div
                  onClick={() =>
                    setData((prev) => [
                      ...prev,
                      {
                        key: new Date(),
                        state: randomState(),
                        date: randomDateTime(),
                      },
                    ])
                  }
                >
                  <PlusOutlined /> New Row
                </div>
              )
            }
          />
        </div>
      </div>

      <FormAdd open={open} setOpen={setOpen} setData={setData} />
    </>
  );
}

export default App;
