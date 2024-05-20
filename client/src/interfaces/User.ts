export interface User {
  id: number | string;
  username: string;
  name: string;
  lastname: string;
  email: string;
  status: Status;
  age: number;
}

export type Status = "active" | "inactive";
