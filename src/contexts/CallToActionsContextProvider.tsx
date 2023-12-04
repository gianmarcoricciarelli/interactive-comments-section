import { Dispatch, ReactNode, SetStateAction, createContext } from 'react';
import { CommentsData, IComment, ICommentWithReplies, IUser } from '../types/types';

interface ICallToActionsContext {
    commentsWithCommentAdder: number[];
    addCommentAdderToComment: Dispatch<SetStateAction<number[]>>;
    onAddComment: (newComment: string) => void;
    onReplyToComment: (replyingTo: ICommentWithReplies, comment: string, user: IUser) => void;
    onEditComment: (newComment: string) => void;
    onDeleteComment: (newComment: string) => void;
}
interface ICallToActionsContextProvider {
    commentsWithCommentAdder: number[];
    addCommentAdderToComment: Dispatch<SetStateAction<number[]>>;
    onUpdateData: Dispatch<SetStateAction<CommentsData>>;
    onCurrentUserAddedComment: Dispatch<SetStateAction<number>>;
    nextCommentId: number;
    children: ReactNode;
}

export const CallToActionsContext = createContext<Partial<ICallToActionsContext>>({});

export function CallToActionsContextProvider({
    onUpdateData,
    onCurrentUserAddedComment,
    nextCommentId,
    commentsWithCommentAdder,
    addCommentAdderToComment,
    children,
}: ICallToActionsContextProvider) {
    const onAddComment = (newComment: string) => {
        onUpdateData((prevData) => ({
            ...prevData,
            comments: [
                ...prevData.comments,
                {
                    id: nextCommentId,
                    user: prevData.currentUser,
                    content: newComment,
                    createdAt: 'Just now',
                    score: 0,
                },
            ],
        }));
        onCurrentUserAddedComment((prevNextCommentId) => prevNextCommentId + 1);
    };
    const onReplyToComment = (replyingTo: ICommentWithReplies, comment: string, user: IUser) => {
        onUpdateData!((prevData) => {
            let commentBeingReplied = prevData.comments.find((comment) => comment.id === replyingTo.id);
            if (commentBeingReplied) {
                const newComment: IComment = {
                    id: nextCommentId,
                    user,
                    createdAt: 'Just now',
                    content: comment,
                    score: 0,
                    replyingTo: replyingTo.user.username,
                };
                commentBeingReplied.replies = commentBeingReplied.replies?.length
                    ? [...commentBeingReplied.replies, newComment]
                    : [newComment];
            } else {
                const commentsWithReplies = prevData.comments.filter((comment) => !!comment.replies?.length);
            }
            return prevData;
        });
        onCurrentUserAddedComment((prevNextCommentId) => prevNextCommentId + 1);
    };
    const onEditComment = () => {};
    const onDeleteComment = () => {};

    return (
        <CallToActionsContext.Provider
            value={{
                commentsWithCommentAdder,
                addCommentAdderToComment,
                onAddComment,
                onReplyToComment,
                onEditComment,
                onDeleteComment,
            }}
        >
            {children}
        </CallToActionsContext.Provider>
    );
}
