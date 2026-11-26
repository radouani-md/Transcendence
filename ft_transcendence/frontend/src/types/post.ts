import { Product } from "./product";

type MediaType = "IMAGE" | "VIDEO";


export type PostMedia = {
    id: number;
    url: string;
    type: MediaType;
}

export type Reaction = {
    id: number;
    userId:  number;
}

export type ClubPost = {
    id: number;
    logoUrl: string;
    posts: Post[]
    reaction: Reaction
}

export type Post = {
    id: number;
    content: string;
    isLiked: boolean;
    media: PostMedia[];
    _count: {
        reactions: number;
        comments: number;
    };
};

export type CommentP = {
    id: number;
    content: string;
}


export type PostsResponse = {
    posts: Post[];
    hasMorePosts: boolean;
    nextCursor: number | null;
};


export type CommentsResponse = {
    comments: CommentP[];
};