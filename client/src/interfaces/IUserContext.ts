import { User } from "./User";

export interface IUserContext {
  users: User[];
  totalUsers: number;
  currentPage: number;
  limit: number;
  offset: number;
  search: string;
  statusFilter: string;

  isLoading: boolean;
  isDeleteModalOpen: boolean;
  isEditModalOpen: boolean;
  currentUser: User | null;

  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setTotalUsers: React.Dispatch<React.SetStateAction<number>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;

  handleAdd: (newUser: User) => void;
  handleDelete: (id: number | string) => void;
  handleEdit: (updatedUser: User) => void;
  handleLoading: (action: () => Promise<void>) => void;

  handleDeleteClick: (user: User) => void;
  handleEditClick: (user: User) => void;
  handleConfirmDelete: () => void;
  handleConfirmEdit: (updatedUser: User) => void;
  handleCancelDelete: () => void;
  handleCancelEdit: () => void;

  filterUsers: (
    users: User[],
    search?: string,
    statusFilter?: string
  ) => User[];
}
