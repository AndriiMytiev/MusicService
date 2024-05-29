export interface User {
  id: number;
  login: string;
  password: string;
  name: string | null;
  surname: string | null;
  info: string | null;
  favorites: number[];
  admin: boolean;
}
