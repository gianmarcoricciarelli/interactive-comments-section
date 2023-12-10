import type { IComment } from "../../types/types";

import React, { useContext } from "react";
import { Comment } from "./Comment/Comment";
import { SectionContext } from "../../contexts/SectionContext";
import { AddACommentForm } from "../AddCommentForm/AddCommentForm";
import style from "./CommentsRoot.module.scss";

interface ICommentsRoot {
    comments?: IComment[];
}

export function CommentsRoot({ comments }: ICommentsRoot): React.JSX.Element {
    const {
        bodyWidth,
        commentsWithAddForm,
        comments: commentsFromData,
    } = useContext(SectionContext);

    const commentsRootComments = comments ?? commentsFromData;

    return (
        <div className={style["comments-root"]}>
            {commentsRootComments.map((comment) => (
                <>
                    <Comment key={comment.id} comment={comment} />
                    {commentsWithAddForm.includes(comment.id) && (
                        <AddACommentForm replyingTo={comment} />
                    )}
                    {comment.replies !== undefined && comment.replies.length > 0 && (
                        <div className={style["comments-root__replies-container"]}>
                            <div className={style["replies-container__line"]} />
                            <div
                                className={style["replies-container__replies"]}
                                style={{
                                    width:
                                        (bodyWidth > 375 ? 580 : 310) - (bodyWidth > 375 ? 60 : 10),
                                }}
                            >
                                <CommentsRoot comments={comment.replies} />
                            </div>
                        </div>
                    )}
                </>
            ))}
        </div>
    );
}
