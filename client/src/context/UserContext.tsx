//CONTEXT.TS
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "../interfaces/User";
import {
  addUser,
  deleteUser,
  updateUser,
  getUsers,
  getTotalUsers,
} from "../api/userApi";
import { v4 as uuidv4 } from "uuid";
import { IUserContext } from "../interfaces/IUserContext";
import { transformUserData } from "../utils/transformUserData";

const UserContext = createContext<IUserContext | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const offset = (currentPage - 1) * limit;
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  //Manejo del click Editar Eliminar___________________

  const handleDeleteClick = (user: User) => {
    setCurrentUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (user: User) => {
    setCurrentUser(user);
    setIsEditModalOpen(true);
  };

  //Confirmación de Modales__________________

  const handleConfirmDelete = () => {
    if (currentUser) {
      handleLoading(async () => {
        await handleDelete(currentUser.id);
        setIsDeleteModalOpen(false);
        setCurrentUser(null);
      });
    }
  };

  const handleConfirmEdit = (updatedUser: User) => {
    handleLoading(async () => {
      await handleEdit(updatedUser);
      setIsEditModalOpen(false);
      setCurrentUser(null);
    });
  };

  //Cancelación de Modales___________________

  const handleCancelDelete = () => {
    setCurrentUser(null);
    setIsDeleteModalOpen(false);
  };

  const handleCancelEdit = () => {
    setCurrentUser(null);
    setIsEditModalOpen(false);
  };

  //Obtencion inicial de datos___________________

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [fetchedUsers, total] = await Promise.all([
          getUsers(limit, offset),
          getTotalUsers(),
        ]);
        const transformedUsers = transformUserData(fetchedUsers);
        setUsers(transformedUsers);
        setTotalUsers(total);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, limit, offset]);

  //Manjo del loader_______________

  const handleLoading = async (action: () => Promise<void>) => {
    setIsLoading(true);
    setTimeout(async () => {
      await action();
      setIsLoading(false);
    }, 2000);
  };

  //Funcion para el filtrado de usuarios_______________

  const filterUsers = (
    users: User[],
    search?: string,
    statusFilter?: string
  ) => {
    let filteredData = users;

    if (search) {
      filteredData = filteredData.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter) {
      filteredData = filteredData.filter(
        (user) => user.status === statusFilter
      );
    }

    return filteredData;
  };

  //Manejo de agregado de usuarios________________

  const handleAdd = async (newUser: User): Promise<void> => {
    try {
      const userWithId = { ...newUser, id: uuidv4() };
      const newUserAdded = await addUser(userWithId);
      setUsers((prevUsers) => [...prevUsers, newUserAdded]);
      setTotalUsers((prevTotal) => prevTotal + 1);
    } catch (error) {
      console.error("Error al agregar usuario", error);
    }
  };

  //Manejo de la eliminación de usuarios________________

  const handleDelete = async (id: number | string): Promise<void> => {
    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      setTotalUsers((prevTotal) => prevTotal - 1);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error al eliminar usuario", error);
    }
  };

  //Manejo de la eedición de usuarios_________________

  const handleEdit = async (updatedUser: User): Promise<void> => {
    try {
      const user = await updateUser(updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? user : u))
      );
    } catch (error) {
      console.error("Error al actualizar usuario", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        totalUsers,
        isLoading,
        currentPage,
        limit,
        offset,
        search,
        statusFilter,
        isDeleteModalOpen,
        isEditModalOpen,
        currentUser,
        setUsers,
        setTotalUsers,
        setSearch,
        setStatusFilter,
        setCurrentPage,
        handleAdd,
        handleDelete,
        handleEdit,
        filterUsers,
        handleLoading,
        handleDeleteClick,
        handleEditClick,
        handleConfirmDelete,
        handleConfirmEdit,
        handleCancelDelete,
        handleCancelEdit,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
