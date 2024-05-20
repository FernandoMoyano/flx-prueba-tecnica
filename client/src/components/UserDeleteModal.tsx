//USEDELTEMODAL.TSX
import { Divider, Modal } from "antd";
import { User } from "../interfaces/User";
import "../index.css";

interface UserDeleteModalProps {
  user: User;
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}

export const UserDeleteModal: React.FC<UserDeleteModalProps> = ({
  open,
  user,
  onOk,
  onCancel,
}) => {
  return (
    <>
      <Modal
        title='Eliminar usuario'
        centered
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        okText='Eliminar'
        cancelText='Cancelar'
        okButtonProps={{ className: "delete-button" }}>
        <Divider />
        <p>
          ¿Está seguro que desea eliminar al usuario {""}
          <span style={{ color: "red" }}>
            {user.name} {user.lastname}?
          </span>
        </p>
        <Divider />
      </Modal>
    </>
  );
};
