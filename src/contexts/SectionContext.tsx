import type { CommentsData, IComment, IUser } from "../types/types";
import type { Dispatch, SetStateAction, ReactNode } from "react";
import React, { createContext, useState } from "react";
import dataJson from "../../data.json";

interface ISectionContextDefault {
    currentUser: IUser;
    comments: IComment[];
    commentsWithAddForm: number[];
    commentsWithEditForm: number[];
    modalIsOpen: boolean;
    commentToDelete: number;
}

interface ISectionContextCallbacks {
    setCommentsWithAddForm?: Dispatch<SetStateAction<number[]>>;
    setCommentsWithEditForm?: Dispatch<SetStateAction<number[]>>;
    onAddComment?: (newComment: string) => void;
    onReplyToComment?: (replyingTo: IComment, comment: string, user: IUser) => void;
    onEditComment?: (commentId: number, newText: string) => void;
    onDeleteComment?: (commentId: number) => void;
    setModalIsOpen?: Dispatch<SetStateAction<boolean>>;
    setCommentToDelete?: Dispatch<SetStateAction<number>>;
}
interface ISectionContextProps {
    children: ReactNode;
}

export const SectionContext = createContext<ISectionContextDefault & ISectionContextCallbacks>({
    currentUser: dataJson.currentUser,
    comments: dataJson.comments,
    commentsWithAddForm: [],
    commentsWithEditForm: [],
    modalIsOpen: false,
    commentToDelete: 0,
});

export function SectionContextProvider({ children }: ISectionContextProps): React.JSX.Element {
    const [data, setData] = useState<CommentsData>(dataJson);
    const [nextCommentId, setNextCommentId] = useState(5);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(0);
    const [commentsWithAddForm, setCommentsWithAddForm] = useState<number[]>([]);
    const [commentsWithEditForm, setCommentsWithEditForm] = useState<number[]>([]);

    const currentUser = data.currentUser;

    const findCommentById = (searchedId: number, comment: IComment): IComment | undefined => {
        if (comment.id === searchedId) {
            return comment;
        }
        if (comment.replies?.length === undefined || comment.replies?.length === 0) {
            return;
        }

        for (const reply of comment?.replies) {
            const foundComment = findCommentById(searchedId, reply);

            if (foundComment !== undefined) {
                return foundComment;
            }
        }
    };

    const onAddComment = (newComment: string): void => {
        setData((prevData) => ({
            ...prevData,
            comments: [
                ...prevData.comments,
                {
                    id: nextCommentId,
                    user: prevData.currentUser,
                    content: newComment,
                    createdAt: "Just now",
                    score: 0,
                },
            ],
        }));
        setNextCommentId((prevNextCommentId) => prevNextCommentId + 1);
    };
    const onReplyToComment = (replyingTo: IComment, comment: string, user: IUser): void => {
        setData((prevData) => {
            const clonedPrevData = structuredClone(prevData);
            let commentBeingReplied: IComment | undefined;

            for (const comment of clonedPrevData.comments) {
                commentBeingReplied = findCommentById(replyingTo.id, comment);

                if (commentBeingReplied !== undefined) {
                    break;
                }
            }

            const newComment: IComment = {
                id: nextCommentId,
                user,
                createdAt: "Just now",
                content: comment,
                score: 0,
                replyingTo: replyingTo.user.username,
            };

            commentBeingReplied!.replies =
                commentBeingReplied!.replies?.length !== 0
                    ? [...(commentBeingReplied!.replies ?? []), newComment]
                    : [newComment];

            return clonedPrevData;
        });
        setCommentsWithAddForm((prevComments) =>
            prevComments.filter((comment) => comment !== replyingTo.id),
        );
        setNextCommentId((prevNextCommentId) => prevNextCommentId + 1);
    };
    const onEditComment = (commentId: number, newText: string): void => {
        setData((prevData) => {
            const clonedPrevData = structuredClone(prevData);
            let commentBeingEdited: IComment | undefined;

            for (const comment of clonedPrevData.comments) {
                commentBeingEdited = findCommentById(commentId, comment);

                if (commentBeingEdited !== undefined) {
                    break;
                }
            }

            commentBeingEdited!.content = newText;

            return clonedPrevData;
        });
        setCommentsWithEditForm((prevComments) =>
            prevComments.filter((comment) => comment !== commentId),
        );
    };
    function searchAndFilterDeletedComment(idToFilter: number, comments: IComment[]): IComment[] {
        if (comments.map((comment) => comment.id).includes(idToFilter)) {
            return comments.filter((comment) => comment.id !== idToFilter);
        }

        const commentsWithReplies = comments.filter(
            (comment) => comment.replies !== undefined && comment.replies.length !== 0,
        );

        for (const comment of commentsWithReplies) {
            comment.replies = searchAndFilterDeletedComment(idToFilter, comment.replies!);
        }

        return comments;
    }
    const onDeleteComment = (commentId: number): void => {
        setData((prevData) => {
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
                comments: data.comments,
                currentUser,
                commentsWithAddForm,
                setCommentsWithAddForm,
                commentsWithEditForm,
                setCommentsWithEditForm,
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
