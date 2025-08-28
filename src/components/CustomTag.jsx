import { Tag } from "antd";

export const CustomTag = ({ value }) => {
  switch (value) {
    case "new customer":
      return <Tag color="red">new customer</Tag>;
    case "pause":
      return <Tag color="gold">pause</Tag>;
    case "to contact":
      return <Tag color="green">to contact</Tag>;
    case "served":
      return <Tag color="blue">served</Tag>;
    default:
      return <Tag>{value}</Tag>;
  }
};
