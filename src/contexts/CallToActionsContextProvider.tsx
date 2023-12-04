import { Dispatch, ReactNode, SetStateAction, createContext } from 'react';
import { CommentsData } from '../types/types';

interface ICallToActionsContext {
    onAddComment: (newComment: string) => void;
    onEditComment: (newComment: string) => void;
    onDeleteComment: (newComment: string) => void;
}
interface ICallToActionsContextProvider {
    children: ReactNode;
    onUpdateData: Dispatch<SetStateAction<CommentsData>>;
    onCurrentUserAddedComment: Dispatch<SetStateAction<number>>;
    onCurrentUserRepliesToComment: Dispatch<SetStateAction<boolean>>;
    nextCommentId: number;
}

export const CallToActionsContext = createContext<Partial<ICallToActionsContext>>({});

export function CallToActionsContextProvider({
    onUpdateData,
    onCurrentUserAddedComment,
    onCurrentUserRepliesToComment,
    nextCommentId,
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
    const onEditComment = () => {
        onCurrentUserRepliesToComment(false);
    };
    const onDeleteComment = () => {};

    return (
        <CallToActionsContext.Provider value={{ onAddComment, onEditComment, onDeleteComment }}>{children}</CallToActionsContext.Provider>
    );
}
