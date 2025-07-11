import { Request, Response } from "express";
import { ArticleService } from "./articles.service";
import { DecodedToken } from "../../types/auth";

export class ArticleController {
  private readonly articleService = new ArticleService();

  public createArticle = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, content, category_id } = req.body;
      const user = (req as any).user as DecodedToken;
      const user_id = user?.id;
      const image = req.file?.filename;

      if (!title || !content || !category_id || !image || !user_id) {
        res.status(400).json({
          success: false,
          message: "All fields (title, content, category_id, image, user_id) are required.",
        });
      }else{
        const newArticle = await this.articleService.createArticle(
        title,
        content,
        image,
        user_id,
        category_id
        );

        res.status(201).json({
            success: true,
            message: "Article created successfully.",
            data: newArticle,
        });
      }
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal server error.",
      });
    }
  };

  public updateArticle = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { title, content, category_id } = req.body;
      const updated_at = new Date();

      if (!id || !title || !content || !category_id) {
        res.status(400).json({
          success: false,
          message: "All fields (id, title, content, category_id) are required.",
        });
      }

      const updatedArticle = await this.articleService.updateArticle(
        id,
        title,
        content,
        category_id,
        updated_at
      );

      res.status(200).json({
        success: true,
        message: "Article updated successfully.",
        data: updatedArticle,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal server error.",
      });
    }
  };

  public deleteArticle = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          message: "Article ID is required.",
        });
      }

      const deletedArticle = await this.articleService.deleteArticle(id);

      res.status(200).json({
        success: true,
        message: "Article deleted successfully.",
        data: deletedArticle,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal server error.",
      });
    }
  };

  public getArticle = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          message: "Article ID is required.",
        });
      }

      const article = await this.articleService.getArticle(id);

      res.status(200).json({
        success: true,
        message: "Article retrieved successfully.",
        data: article,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal server error.",
      });
    }
  };

  public listArticles = async (_req: Request, res: Response): Promise<void> => {
    try {
      const articles = await this.articleService.listArticles();

      res.status(200).json({
        success: true,
        message: "Articles retrieved successfully.",
        data: articles,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal server error.",
      });
    }
  };
}
