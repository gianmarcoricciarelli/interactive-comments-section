import { Dispatch, ReactNode, SetStateAction, createContext } from 'react';
import { CommentsData, IComment, IUser } from '../types/types';

interface ISectionContext {
    currentUser: IUser;
    commentsWithAddForm: number[];
    addAddFormToComment: Dispatch<SetStateAction<number[]>>;
    onAddComment: (newComment: string) => void;
    onReplyToComment: (replyingTo: IComment, comment: string, user: IUser) => void;
    onEditComment: (newComment: string) => void;
    onDeleteComment: (newComment: string) => void;
}
interface ISectionContextProvider {
    currentUser: IUser;
    commentsWithAddForm: number[];
    addAddFormToComment: Dispatch<SetStateAction<number[]>>;
    onUpdateData: Dispatch<SetStateAction<CommentsData>>;
    onCurrentUserAddedComment: Dispatch<SetStateAction<number>>;
    nextCommentId: number;
    children: ReactNode;
}

export const SectionContext = createContext<Partial<ISectionContext>>({});

export function SectionContextProvider({
    currentUser,
    onUpdateData,
    onCurrentUserAddedComment,
    nextCommentId,
    commentsWithAddForm,
    addAddFormToComment,
    children,
}: ISectionContextProvider) {
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

    const search = (replyId: number, comment: IComment): IComment | undefined => {
        if (comment.id === replyId) {
            return comment;
        }
        if (!comment.replies?.length) {
            return;
        }

        for (const reply of comment?.replies) {
            const commentBeingReplied = search(replyId, reply);

            if (commentBeingReplied) {
                return commentBeingReplied;
            }
        }
    };
    const onReplyToComment = (replyingTo: IComment, comment: string, user: IUser) => {
        onUpdateData!((prevData) => {
            const clonedPrevData = structuredClone(prevData);
            let commentBeingReplied;

            for (const comment of clonedPrevData.comments) {
                commentBeingReplied = search(replyingTo.id, comment);

                if (commentBeingReplied) {
                    break;
                }
            }

            const newComment: IComment = {
                id: nextCommentId,
                user,
                createdAt: 'Just now',
                content: comment,
                score: 0,
                replyingTo: replyingTo.user.username,
            };
            commentBeingReplied!.replies = commentBeingReplied!.replies?.length
                ? [...commentBeingReplied!.replies, newComment]
                : [newComment];

            return clonedPrevData;
        });
        addAddFormToComment((prevComments) => prevComments.filter((comment) => comment !== replyingTo.id));
        onCurrentUserAddedComment((prevNextCommentId) => prevNextCommentId + 1);
    };
    const onEditComment = () => {};
    const onDeleteComment = () => {};

    return (
        <SectionContext.Provider
            value={{
                currentUser,
                commentsWithAddForm,
                addAddFormToComment,
                onAddComment,
                onReplyToComment,
                onEditComment,
                onDeleteComment,
            }}
        >
            {children}
        </SectionContext.Provider>
    );
}
