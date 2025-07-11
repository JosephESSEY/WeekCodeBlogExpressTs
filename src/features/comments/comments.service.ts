import { CommentRepository } from "./comments.repository";
import { Comment } from "./comments.model";

export class CommentService {
  private readonly commentRepository = new CommentRepository();

  public async createComment(content: string, user_id: string, article_id: string): Promise<Comment> {
    if (!content || !user_id || !article_id) {
      throw { statusCode: 400, message: "Missing required fields." };
    }

    return this.commentRepository.createComment(content, user_id, article_id);
  }

  public async getCommentsByArticle(article_id: string): Promise<Comment[]> {
    return this.commentRepository.getCommentsByArticle(article_id);
  }

  public async deleteComment(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findCommentById(id);
    if (!comment) throw { statusCode: 404, message: "Comment not found." };
    return this.commentRepository.deleteComment(id);
  }
}
