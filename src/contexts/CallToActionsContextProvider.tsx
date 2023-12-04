import { Dispatch, ReactNode, SetStateAction, createContext } from 'react';
import { CommentsData } from '../types/types';

interface ICallToActionsContext {
    commentsWithCommentAdder: number[];
    addCommentAdderToComment: Dispatch<SetStateAction<number[]>>;
    onAddComment: (newComment: string) => void;
    onReplyToComment: () => void;
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
    const onReplyToComment = () => {};
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
