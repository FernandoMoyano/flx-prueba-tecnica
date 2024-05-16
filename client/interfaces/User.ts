export interface Users {
  users: User[];
}

export interface User {
  id: number;
  username: string;
  name: string;
  lastname: string;
  email: string;
  status: Status;
  age: number;
}

export type Status = "active" | "inactive";
