import { Button, Form, Input, message, Modal, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import { randomDateTime, randomState } from "../utils";

export const FormAdd = ({ open, setOpen, setData }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const options = [
    { label: "new customer", value: "new customer" },
    { label: "pause", value: "pause" },
    { label: "to contact", value: "to contact" },
    { label: "served", value: "served" },
  ];

  return (
    <>
      {contextHolder}

      <Modal
        title="Add row"
        open={open}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
        footer={null}
        width={450}
      >
        <Form
          form={form}
          requiredMark={true}
          name="form-add"
          onFinish={(values) => {
            setLoading(true);

            setData((prev) => [
              ...prev,
              {
                key: Date.now(),
                state: randomState(),
                date: randomDateTime(),
                ...values,
              },
            ]);
            setTimeout(() => {
              setLoading(false);
              form.resetFields();
              setOpen(false);
              messageApi.success("Add success");
            }, 200);
          }}
        >
          <Form.Item
            name="id"
            required
            rules={[{ required: true, message: "Please input" }]}
          >
            <Input placeholder="Enter input" />
          </Form.Item>
          <Form.Item
            name="bio"
            rules={[{ required: true, message: "Please input" }]}
          >
            <Input.TextArea placeholder="Enter input" rows={3} />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input" }]}
          >
            <Input placeholder="Enter input" />
          </Form.Item>
          <Form.Item
            name="language"
            rules={[{ required: true, message: "Please input" }]}
          >
            <Input placeholder="Enter input" />
          </Form.Item>
          <Form.Item
            name="version"
            rules={[{ required: true, message: "Please select" }]}
          >
            <Select options={options} placeholder="Select option" />
          </Form.Item>

          <Form.Item>
            <Button
              className="w-full"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
