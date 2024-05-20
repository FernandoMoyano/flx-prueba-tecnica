import { User } from "../interfaces/User";

interface Errors {
  [key: string]: string;
}

const validate = (values: User): Errors => {
  const errors: Errors = {};

  if (!values.username) {
    errors.username = "Por favor ingrese el nombre de usuario";
  }

  if (!values.email) {
    errors.email = "Por favor ingrese el correo electrónico";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Por favor ingrese un correo electrónico válido";
  }

  if (!values.name) {
    errors.name = "Por favor ingrese el nombre";
  } else if (/\d/.test(values.name)) {
    errors.name = "El nombre no puede contener números";
  }

  if (!values.lastname) {
    errors.lastname = "Por favor ingrese el apellido";
  } else if (/\d/.test(values.lastname)) {
    errors.lastname = "El apellido no puede contener números";
  }

  if (!values.status) {
    errors.status = "Por favor seleccione el estado";
  }

  if (!values.age) {
    errors.age = "Por favor ingrese la edad";
  } else if (values.age <= 0) {
    errors.age = "Por favor ingrese una edad válida";
  }

  return errors;
};

export default validate;
