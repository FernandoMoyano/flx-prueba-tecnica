//USEREDITMODAL
import { User } from "../interfaces/User";
import { Divider, Input, Modal, Select } from "antd";
import "../index.css";
import validate from "../utils/validationRules";
import useFormValidation from "../hooks/UseFormValidation";

//Interface
interface UserEditModalProps {
  user: User;
  open: boolean;
  onOk: (updatedUser: User) => void;
  onCancel: () => void;
}

export const UesrEditModal: React.FC<UserEditModalProps> = ({
  user,
  open,
  onOk,
  onCancel,
}) => {
  const { values, errors, handleChange, handleSelectChange, handleSubmit } =
    useFormValidation<User>(user, validate);

  const handleOk = () => {
    handleSubmit(() => {
      onOk(values);
    });
  };

  return (
    <>
      <Modal
        title='Editar usuario'
        centered
        open={open}
        onOk={handleOk}
        onCancel={onCancel}
        okText='Editar Usuario'
        width={600}>
        <Divider />

        <div className='user-edit-form'>
          <div>
            <label htmlFor='username'>Usuario</label>
            <Input
              name='username'
              onChange={handleChange}
              value={values.username}
              type='text'
              placeholder='username'
            />
            {errors.username && <p className='error'>{errors.username}</p>}
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <Input
              name='email'
              onChange={handleChange}
              value={values.email}
              type='text'
              placeholder='email'
            />
            {errors.email && <p className='error'>{errors.email}</p>}
          </div>
          <div>
            <label htmlFor='name'>Nombre</label>
            <Input
              name='name'
              onChange={handleChange}
              value={values.name}
              type='text'
              placeholder='name'
            />
            {errors.name && <p className='error'>{errors.name}</p>}
          </div>
          <div>
            <label htmlFor='lastname'>Apellido</label>
            <Input
              name='lastname'
              onChange={handleChange}
              value={values.lastname}
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
              onChange={handleChange}
              value={values.age}
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
