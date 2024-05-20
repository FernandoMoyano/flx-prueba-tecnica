//USERADDMODAL.TSX
import { User } from "../interfaces/User";
import { Divider, Input, Modal, Select } from "antd";
import "../index.css";
import useFormValidation from "../hooks/UseFormValidation";
import validate from "../utils/validationRules";

//Interface
interface UserAddModalProps {
  open: boolean;
  onOk: (updatedUser: User) => void;
  onCancel: () => void;
}

export const UserAddModal: React.FC<UserAddModalProps> = ({
  open,
  onOk,
  onCancel,
}) => {
  //Estado inicial para el formulario de agregar usuario__________
  const initialFormData: User = {
    id: 0,
    username: "",
    email: "",
    name: "",
    lastname: "",
    status: "active",
    age: 0,
  };

  const { values, errors, handleChange, handleSelectChange, handleSubmit } =
    useFormValidation<User>(initialFormData, validate);

  const handleOk = () => {
    handleSubmit(() => {
      onOk(values);
    });
  };

  return (
    <>
      <Modal
        title='Agregar Usuario'
        centered
        open={open}
        onOk={handleOk}
        onCancel={onCancel}
        okText='Agregar Usuario'
        width={600}>
        <Divider />

        <div className='user-edit-form'>
          <div>
            <label htmlFor='username'>Usuario</label>
            <Input
              name='username'
              value={values.username}
              onChange={handleChange}
              type='text'
              placeholder='username'
            />
            {errors.username && <p className='error'>{errors.username}</p>}
          </div>

          <div>
            <label htmlFor='email'>Email</label>
            <Input
              name='email'
              value={values.email}
              onChange={handleChange}
              type='text'
              placeholder='email'
            />
            {errors.email && <p className='error'>{errors.email}</p>}
          </div>

          <div>
            <label htmlFor='name'>Nombre</label>
            <Input
              name='name'
              value={values.name}
              onChange={handleChange}
              type='text'
              placeholder='name'
            />
            {errors.name && <p className='error'>{errors.name}</p>}
          </div>

          <div>
            <label htmlFor='lastname'>Apellido</label>
            <Input
              name='lastname'
              value={values.lastname}
              onChange={handleChange}
              type='text'
              placeholder='lastname'
            />
            {errors.lastname && <p className='error'>{errors.lastname}</p>}
          </div>

          <div>
            <label htmlFor='status'>Estado</label>
            <Select
              style={{ width: 270 }}
              size='middle'
              placeholder='Seleccionar estado'
              value={values.status}
              onChange={(value) => handleSelectChange("status", value)}>
              <Select.Option value='active'>Activo</Select.Option>
              <Select.Option value='inactive'>Inactivo</Select.Option>
            </Select>
            {errors.status && <p className='error'>{errors.status}</p>}
          </div>

          <div>
            <label htmlFor='age'>Edad</label>
            <Input
              name='age'
              value={values.age}
              onChange={handleChange}
              type='number'
              placeholder='age'
            />
            {errors.age && <p className='error'>{errors.age}</p>}
          </div>
        </div>
        <Divider />
      </Modal>
    </>
  );
};
