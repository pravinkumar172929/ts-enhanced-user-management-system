export interface UserAuth {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "Admin" | "User";
}
