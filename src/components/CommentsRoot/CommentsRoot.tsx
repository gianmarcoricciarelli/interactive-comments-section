import type { IComment } from "../../types/types";

import React, { useContext } from "react";
import { Comment } from "./Comment/Comment";
import { SectionContext } from "../../contexts/SectionContext";
import { AddACommentForm } from "../AddCommentForm/AddCommentForm";
import style from "./CommentsRoot.module.scss";

interface ICommentsRoot {
    comments?: IComment[];
    repliesContainerWidth?: number;
}

export function CommentsRoot({
    comments,
    repliesContainerWidth = 580,
}: ICommentsRoot): React.JSX.Element {
    const { commentsWithAddForm, comments: commentsFromData } = useContext(SectionContext);

    const commentsRootComments = comments ?? commentsFromData;

    return (
        <div className={style["comments-root"]} style={{ width: repliesContainerWidth }}>
            {commentsRootComments.map((comment) => (
                <>
                    <Comment
                        key={comment.id}
                        comment={comment}
                        containerWidth={repliesContainerWidth}
                    />
                    {commentsWithAddForm.includes(comment.id) && (
                        <AddACommentForm
                            replyingTo={comment}
                            containerWidth={repliesContainerWidth}
                        />
                    )}
                    {comment.replies !== undefined && comment.replies.length > 0 && (
                        <div
                            className={style["comments-root__replies-container"]}
                            style={{ width: repliesContainerWidth }}
                        >
                            <div className={style["replies-container__line"]} />
                            <div
                                className={style["replies-container__replies"]}
                                style={{ width: repliesContainerWidth - 60 }}
                            >
                                <CommentsRoot
                                    comments={comment.replies}
                                    repliesContainerWidth={repliesContainerWidth - 60}
                                />
                            </div>
                        </div>
                    )}
                </>
            ))}
        </div>
    );
}
