export interface Articles{
    id?: string;
    title: string;
    content: string;
    image: string;
    created_at: Date;
    updated_at: Date;
    user_id: string;
    category_id: string;
}