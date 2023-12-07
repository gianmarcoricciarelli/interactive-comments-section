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
    replies?: IComment[];
}

export interface CommentsData {
    currentUser: IUser;
    comments: IComment[];
}
