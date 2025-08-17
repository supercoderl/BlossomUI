export interface Blog {
    id: string;
    title: string;
    slug: string;
    content: string;
    tags: string;
    publishedAt: Date;
    isPublished: boolean;
    authorId: string;
    thumbnailUrl: string;
    viewsCount: number;
    commentsCount: number;
    createdAt: Date;
    updatedAt?: Date;
    authorName: string;
}

export interface BlogFormData {
    blogId?: string;
    title: string;
    slug: string;
    content: string;
    tags: string;
    publishedAt: Date;
    isPublished: boolean;
    thumbnailUrl: string;
}