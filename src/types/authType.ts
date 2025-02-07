enum UserType {
  Admin = "Admin",
  User = "User",
}

export interface UserAuth {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserType;
}
