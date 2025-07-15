export interface User {
  id?: string;
  email: string;
  password: string;
  role: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}