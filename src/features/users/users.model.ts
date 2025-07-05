export interface User {
  id?: number;
  email: string;
  password: string;
  role: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}