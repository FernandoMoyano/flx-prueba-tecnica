import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "../index.css";

const antIcon = <LoadingOutlined style={{ fontSize: 32, color: "red" }} spin />;

const Loader: React.FC = () => {
  return (
    <div className='loader'>
      <Spin indicator={antIcon} />
    </div>
  );
};

export default Loader;
