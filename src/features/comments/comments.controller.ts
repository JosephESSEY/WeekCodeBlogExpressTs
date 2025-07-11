import { Request, Response } from "express";
import { CommentService } from "./comments.service";
import { DecodedToken } from "../../types/auth";

export class CommentController {
  private readonly commentService = new CommentService();

  public createComment = async (req: Request, res: Response): Promise<void> => {
    try {
      const { content, article_id } = req.body;
      const user = (req as any).user as DecodedToken;
      const user_id = user.id;

      const newComment = await this.commentService.createComment(content, user_id, article_id);

      res.status(201).json({
        success: true,
        message: "Comment added successfully.",
        data: newComment,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal server error.",
      });
    }
  };

  public getCommentsByArticle = async (req: Request, res: Response): Promise<void> => {
    try {
      const { article_id } = req.params;
      const comments = await this.commentService.getCommentsByArticle(article_id);

      res.status(200).json({
        success: true,
        message: "Comments retrieved successfully.",
        data: comments,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal server error.",
      });
    }
  };

  public deleteComment = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await this.commentService.deleteComment(id);

      res.status(200).json({
        success: true,
        message: "Comment deleted successfully.",
        data: deleted,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal server error.",
      });
    }
  };
}
