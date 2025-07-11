export interface Comment {
  id?: string;
  content: string;
  created_at?: Date;
  updated_at?: Date;
  user_id: string;
  article_id: string;
}
