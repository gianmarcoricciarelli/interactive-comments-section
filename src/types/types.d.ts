export interface IUser {
    image: {
        png: string;
        webp: string;
    };
    username: string;
}

export interface IComment {
    id: number;
    user: IUser;
    content: string;
    createdAt: string;
    score: number;
    replyingTo?: string;
}

export interface ICommentWithReplies extends IComment {
    replies?: IComment[];
}

export interface CommentsData {
    currentUser: IUser;
    comments: ICommentWithReplies[];
}
