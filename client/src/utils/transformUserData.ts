import { User } from "../interfaces/User";

export const transformUserData = (users: User[]): User[] => {
  if (!users) return [];

  return users.map((user) => ({
    id: user.id,
    username: user.username,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    status: user.status,
    age: user.age,
  }));
};
