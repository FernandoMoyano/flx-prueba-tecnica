import { useState, ChangeEvent } from "react";

interface Errors {
  [key: string]: string;
}

const useFormValidation = <T>(
  initialState: T,
  validate: (values: T) => Errors
) => {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: name === "age" ? Number(value) : value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (callback: () => void) => {
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      callback();
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSelectChange,
    handleSubmit,
  };
};

export default useFormValidation;
