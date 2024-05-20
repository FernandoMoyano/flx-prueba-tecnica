//USERTABLE.TSX
import React, { useContext } from "react";
import { User } from "../interfaces/User";
import Table from "antd/es/table";
import { Space, TableProps, Tag } from "antd";
import { UserDeleteModal } from "./UserDeleteModal";
import { UesrEditModal } from "./UserEditModal";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../index.css";

//Interface__________________________
interface UserTableProps {
  data: User[];
}

export const UserTable: React.FC<UserTableProps> = ({ data }) => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }

  const {
    handleDeleteClick,
    handleEditClick,
    isDeleteModalOpen,
    isEditModalOpen,
    currentUser,
    handleConfirmDelete,
    handleConfirmEdit,
    handleCancelDelete,
    handleCancelEdit,
  } = userContext;

  //Estructura de la tabla_________________________
  const columns: TableProps<User>["columns"] = [
    {
      title: "Usuario",
      dataIndex: "username",
      key: "username",
    },

    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Apellido",
      dataIndex: "lastname",
      key: "lastname",
    },

    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color = status === "inactive" ? "red" : "green";
        return <Tag color={color}>{status}</Tag>;
      },
    },

    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <Space size='middle'>
          <a
            onClick={() => {
              handleEditClick(record);
              navigate(`/users/${record.id}`);
            }}>
            Edit
          </a>
          <a
            onClick={() => {
              handleDeleteClick(record);
              navigate(`/users/${record.id}`);
            }}>
            Delete
          </a>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className='table-container'>
        <Table
          columns={columns}
          dataSource={data}
          rowKey='id'
          size='middle'
          pagination={false}
        />
      </div>
      {currentUser && (
        <>
          <UserDeleteModal
            open={isDeleteModalOpen}
            user={currentUser}
            onOk={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />

          <UesrEditModal
            open={isEditModalOpen}
            user={currentUser}
            onOk={handleConfirmEdit}
            onCancel={handleCancelEdit}
          />
        </>
      )}
    </>
  );
};
