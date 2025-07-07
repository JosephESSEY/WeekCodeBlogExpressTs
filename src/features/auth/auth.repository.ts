import pool from "../../shared/database/client";
import { User } from "../users/users.model";

export class AuthRepository {
  public async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
      "SELECT id, email, password, role, created_at, updated_at FROM users WHERE email = $1",
      [email]
    );
    return result.rows[0] || null;
  }

  public async createUser( name: string, email: string, hashedPassword: string): Promise<User> {
    const result = await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, role, created_at, updated_at`,
      [name, email, hashedPassword, 'visitor']
    );
    return result.rows[0];
  }
}
