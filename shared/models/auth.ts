export interface User {
  id: string;
  username: string;
  password?: string;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  profileImageUrl?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export type UpsertUser = Omit<User, "id" | "createdAt" | "updatedAt">;
