export interface AuthSessionUser {
  id: string;
  email: string;
  role: "admin" | "analyst" | "operator" | "investor";
}

