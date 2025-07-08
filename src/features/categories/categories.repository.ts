import { Categories } from "./categories.model";
import pool from "../../shared/database/client";
import { V } from "vitest/dist/chunks/reporters.d.BFLkQcL6";

export class CategoriesRepository{
    public async createCategorie(name: string): Promise<Categories>{
       const query = `INSERT INTO categories(name)
       VALUES($1)
       RETURNING *`;
       const value = [name];
       const result = await pool.query(query, value);
       return result.rows[0];
    }

    public async allCategories(): Promise<Categories[] | null>{
        const query =`SELECT *
        FROM categories`;
        const result = await pool.query(query);
        return result.rows || null
    }

    public async updateCategorie(id: string, name: string): Promise<Categories>{
        const query = `UPDATE categories
        SET name = $1
        WHERE id = $2
        RETURNING *`;
        const values = [name, id];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    public async deleteCategorie(id: string): Promise<Categories>{
        const query = `DELETE FROM categories
        WHERE id = $1 
        RETURNING *`;
        const value = [id];
        const result = await pool.query(query, value);
        return result.rows[0];
    }

    public async findCategorieById(id: string): Promise<Categories | null>{
        const query = `SELECT * FROM categories
        WHERE id = $1`;
        const value = [id];
        const result = await pool.query(query, value);
        return result.rows[0] || null;
    }
}