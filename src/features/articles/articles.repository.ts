import { Articles } from "./articles.model";
import pool from "../../shared/database/client";

export class ArticleRepository{
    public async createArticle(title: string, content: string, image: string, user_id: string, category_id: string ): Promise<Articles>{
        const query = `INSERT INTO articles(title, content, image, user_id, category_id)
        VALUES($1, $2, $3, $4, $5) 
        RETURNING *`;
        const values = [title, content, image, user_id, category_id];
        const execute = await pool.query(query, values);
        return execute.rows[0];
    }

    public async updateArticle(id: string, title: string, content: string, category_id: string, updated_at: Date): Promise<Articles>{
        const query = `UPDATE articles
        SET title = $1,
        content = $2,
        category_id = $3,
        updated_at = $4
        WHERE id = $5
        RETURNING *`;
        const values = [title, content, category_id, updated_at, id];
        const execute = await pool.query(query, values);
        return execute.rows[0];
    }
    
    public async deleteArticle(id: string): Promise<Articles>{
        const query = `DELETE FROM articles 
        WHERE id = $1
        RETURNING *`;
        const value = [id];
        const execute = await pool.query(query, value);
        return execute.rows[0];
    }

    public async getAllArticles(): Promise<Articles[] | null>{
        const query = `SELECT A.id as article_id, A.title, A.content, A.created_at, A.updated_at, C.name as categorie, C.id as categorie_id
        FROM articles A
        JOIN categories C ON C.id = A.category_id`;
        const execute = await pool.query(query)
        return execute.rows || null;
    }

    public async findArticleByid(id: string): Promise<Articles | null>{
        const query = `SELECT * A.id as article_id, A.title, A.content, A.created_at, A.updated_at, C.name as categorie, C.id as categorie_id
        FROM articles A
        JOIN categories C ON C.id = A.category_id
        WHERE A.id = $1`;
        const value = [id];
        const execute = await pool.query(query, value);
        return execute.rows[0];
    }
}
