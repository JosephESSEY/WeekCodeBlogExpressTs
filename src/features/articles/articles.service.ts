import { Articles } from "./articles.model";
import { ArticleRepository } from "./articles.repository";

export class ArticleService {
  private readonly articleRepository: ArticleRepository;

  constructor() {
    this.articleRepository = new ArticleRepository();
  }

  public async createArticle(
    title: string,
    content: string,
    image: string,
    user_id: string,
    category_id: string
  ): Promise<Articles> {
    const article = await this.articleRepository.createArticle(title, content, image, user_id, category_id);

    if (!article) {
      throw {
        statusCode: 400,
        message: "Failed to create article.",
      };
    }

    return article;
  }

  public async updateArticle(
    id: string,
    title: string,
    content: string,
    category_id: string,
    updated_at: Date
  ): Promise<Articles> {
    const existing = await this.articleRepository.findArticleByid(id);

    if (!existing) {
      throw {
        statusCode: 404,
        message: "Article not found.",
      };
    }

    return this.articleRepository.updateArticle(id, title, content, category_id, updated_at);
  }

  public async deleteArticle(id: string): Promise<Articles> {
    const existing = await this.articleRepository.findArticleByid(id);

    if (!existing) {
      throw {
        statusCode: 404,
        message: "Article not found.",
      };
    }

    return this.articleRepository.deleteArticle(id);
  }

  public async listArticles(): Promise<Articles[]> {
    const articles = await this.articleRepository.getAllArticles();

    if (!articles || articles.length === 0) {
      throw {
        statusCode: 404,
        message: "No articles found.",
      };
    }

    return articles;
  }

  public async getArticle(id: string): Promise<Articles> {
    const article = await this.articleRepository.findArticleByid(id);

    if (!article) {
      throw {
        statusCode: 404,
        message: "Article not found.",
      };
    }

    return article;
  }
}
