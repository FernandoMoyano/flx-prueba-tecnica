import { User } from "../interfaces/User";

const baseUrl = "http://localhost:4000/users";
const headers = {
  "Content-Type": "application/json",
};

//GET Users con limit y offset______________________________
export const getUsers = async (
  limit: number | undefined,
  offset: number | undefined
): Promise<User[]> => {
  try {
    const response = await fetch(
      `${baseUrl}?_limit=${limit}&_start=${offset}`,
      {
        method: "GET",
        headers: headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.statusText}`);
    }
    const data: User[] = await response.json();

    return data;
  } catch (error) {
    console.error("Error al intentar obtener los datos", error);
    throw error;
  }
};

//GET Total Users__________________________
export const getTotalUsers = async (): Promise<number> => {
  try {
    const response = await fetch(baseUrl, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.statusText}`);
    }
    const data: User[] = await response.json();

    return data.length;
  } catch (error) {
    console.error("Error al intentar obtener el total de usuarios", error);
    throw error;
  }
};

//DELETE Users_____________________________
export const deleteUser = async (id: number | string): Promise<void> => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar usuario: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error al intentar eliminar usuario", error);
    throw error;
  }
};

//UPDATE Users____________________________
export const updateUser = async (updatedUser: User): Promise<User> => {
  try {
    const response = await fetch(`${baseUrl}/${updatedUser.id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar usuario: ${response.statusText}`);
    }

    const data: User = await response.json();

    return data;
  } catch (error) {
    console.error("Error al intentar actualizar usuario", error);
    throw error;
  }
};

//POST User_____________________________
export const addUser = async (newUser: User): Promise<User> => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error(`No pudimos agregar el usuario ${response.statusText}`);
    }

    const newUserAdded: User = await response.json();

    return newUserAdded;
  } catch (error) {
    console.error("Error al agregar el usuario", error);
    throw error;
  }
};
