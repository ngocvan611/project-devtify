/* eslint-disable no-undef */
import { Input, Select } from "antd";
import { useEffect, useState } from "react";
import { CustomTag } from "./CustomTag";

export const InputEdit = ({
  edit,
  defaultValue,
  record,
  setData,
  field,
  setRowEdit,
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const onSave = () => {
    setData((prev) =>
      prev.map((row) =>
        row.key === record.key ? { ...row, [field]: value } : row,
      ),
    );
    setRowEdit(null);
  };

  const onCancel = () => {
    setValue(defaultValue);
    setRowEdit(null);
  };

  const options = [
    { label: "new customer", value: "new customer" },
    { label: "pause", value: "pause" },
    { label: "to contact", value: "to contact" },
    { label: "served", value: "served" },
  ];

  const commonProps = {
    value,
    onChange: (e) => setValue(e?.target ? e.target.value : e),
    onBlur: onSave,
    onPressEnter: onSave,
    onKeyDown: (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCancel();
      }
    },
  };

  return edit ? (
    field === "version" ? (
      <Select options={options} {...commonProps} />
    ) : field === "bio" ? (
      <Input.TextArea placeholder="Nhập dữ liệu" {...commonProps} rows={3} />
    ) : (
      <Input placeholder="Nhập dữ liệu" {...commonProps} />
    )
  ) : field === "version" ? (
    <CustomTag value={defaultValue} />
  ) : (
    defaultValue
  );
};
