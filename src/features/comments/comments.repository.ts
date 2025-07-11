import pool from "../../shared/database/client";
import { Comment } from "./comments.model";

export class CommentRepository {
  public async createComment(content: string, user_id: string, article_id: string): Promise<Comment> {
    const query = `
      INSERT INTO comments (content, user_id, article_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [content, user_id, article_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  public async getCommentsByArticle(article_id: string): Promise<Comment[]> {
    const query = `
      SELECT c.*, u.name as user_name
      FROM comments c
      LEFT JOIN users u ON c.user_id = u.id
      WHERE c.article_id = $1
      ORDER BY c.created_at ASC;
    `;
    const result = await pool.query(query, [article_id]);
    return result.rows;
  }

  public async deleteComment(id: string): Promise<Comment> {
    const query = `
      DELETE FROM comments
      WHERE id = $1
      RETURNING *;
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  public async findCommentById(id: string): Promise<Comment | null> {
    const query = `SELECT * FROM comments WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }
}
