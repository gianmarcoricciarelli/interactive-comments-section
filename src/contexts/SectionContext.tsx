import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';
import { CommentsData, IComment, IUser } from '../types/types';

interface ISectionContext {
    currentUser: IUser;
    commentsWithAddForm: number[];
    addAddFormToComment: Dispatch<SetStateAction<number[]>>;
    commentsWithEditForm: number[];
    addEditFormToComment: Dispatch<SetStateAction<number[]>>;
    onAddComment: (newComment: string) => void;
    onReplyToComment: (replyingTo: IComment, comment: string, user: IUser) => void;
    onEditComment: (commentId: number, newText: string) => void;
    onDeleteComment: (commentId: number) => void;
    modalIsOpen: boolean;
    setModalIsOpen: Dispatch<SetStateAction<boolean>>;
    commentToDelete: number;
    setCommentToDelete: Dispatch<SetStateAction<number>>;
}
interface ISectionContextProvider {
    currentUser: IUser;
    commentsWithAddForm: number[];
    addAddFormToComment: Dispatch<SetStateAction<number[]>>;
    commentsWithEditForm: number[];
    addEditFormToComment: Dispatch<SetStateAction<number[]>>;
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
    commentsWithEditForm,
    addEditFormToComment,
    children,
}: ISectionContextProvider) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(0);

    const findCommentById = (searchedId: number, comment: IComment): IComment | undefined => {
        if (comment.id === searchedId) {
            return comment;
        }
        if (!comment.replies?.length) {
            return;
        }

        for (const reply of comment?.replies) {
            const foundComment = findCommentById(searchedId, reply);

            if (foundComment) {
                return foundComment;
            }
        }
    };

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
    const onReplyToComment = (replyingTo: IComment, comment: string, user: IUser) => {
        onUpdateData!((prevData) => {
            const clonedPrevData = structuredClone(prevData);
            let commentBeingReplied;

            for (const comment of clonedPrevData.comments) {
                commentBeingReplied = findCommentById(replyingTo.id, comment);

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
    const onEditComment = (commentId: number, newText: string): void => {
        onUpdateData!((prevData) => {
            const clonedPrevData = structuredClone(prevData);
            let commentBeingEdited;

            for (const comment of clonedPrevData.comments) {
                commentBeingEdited = findCommentById(commentId, comment);

                if (commentBeingEdited) {
                    break;
                }
            }

            commentBeingEdited!.content = newText;

            return clonedPrevData;
        });
        addEditFormToComment((prevComments) => prevComments.filter((comment) => comment !== commentId));
    };
    function searchAndFilterDeletedComment(idToFilter: number, comments: IComment[]): IComment[] {
        if (comments.map((comment) => comment.id).includes(idToFilter)) {
            return comments.filter((comment) => comment.id !== idToFilter);
        }

        const commentsWithReplies = comments.filter((comment) => !!comment.replies?.length);

        for (const comment of commentsWithReplies) {
            comment.replies = searchAndFilterDeletedComment(idToFilter, comment.replies!);
        }

        return comments;
    }
    const onDeleteComment = (commentId: number) => {
        onUpdateData!((prevData) => {
            const filteredComments = searchAndFilterDeletedComment(commentId, prevData.comments);

            return {
                currentUser: prevData.currentUser,
                comments: filteredComments,
            };
        });
    };

    return (
        <SectionContext.Provider
            value={{
                currentUser,
                commentsWithAddForm,
                addAddFormToComment,
                commentsWithEditForm,
                addEditFormToComment,
                onAddComment,
                onReplyToComment,
                onEditComment,
                onDeleteComment,
                modalIsOpen,
                setModalIsOpen,
                commentToDelete,
                setCommentToDelete,
            }}
        >
            {children}
        </SectionContext.Provider>
    );
}
