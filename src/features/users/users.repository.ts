import { S } from "vitest/dist/chunks/config.d.D2ROskhv";
import pool from "../../shared/database/client"
import {User} from "./users.model";

export class UserRepository{

    public async getAllVisitors(): Promise<User[] | null> {
        const query = `SELECT id, name, email, created_at, updated_at
        FROM users
        WHERE role = 'visitor'`;
        const result = await pool.query(query); 
        return result.rows || null;
    }

    public async getVisitorById(id : string): Promise<User | null> {
        const query = `SELECT id, name, email, role, created_at, updated_at
        FROM users
        WHERE id = $1`;
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0] || null;
    } 

    public async updateAccount(id: string, name: string): Promise<User | null>{
        const query = `UPDATE users
        SET name = $1
        WHERE id = $2
        RETURNING id, name, email, role, created_at, updated_at`;
        const values = [name, id];
        const result = await pool.query(query, values);
        return result.rows[0] || null;
    }

    // public async deleteAccount(id: string): Promise<User | null>{
    //     const query = `DELETE FORM users WHERE id = $1`;
    //     const value = [id];
    //     const result = await pool.query(query, value);
    //     return result.rows[0] || null;
    // }

}