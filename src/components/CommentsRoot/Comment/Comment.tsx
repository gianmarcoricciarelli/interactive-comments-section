import type { IComment } from "../../../types/types";
import { Content } from "./Content/Content";
import { ReactionCounter } from "./ReactionCounter/ReactionCounter";
import style from "./Comment.module.scss";
import React, { useContext } from "react";
import { SectionContext } from "../../../contexts/SectionContext";
import { CallToActions } from "./Content/CallToActions/CallToActions";

export interface CommentInterface {
    comment: IComment;
}

export function Comment({ comment }: CommentInterface): React.JSX.Element {
    const { bodyWidth, currentUser } = useContext(SectionContext);

    return (
        <div className={style.comment}>
            {bodyWidth > 375 && <ReactionCounter score={comment.score} />}
            <Content currentUserName={currentUser.username} comment={comment} />
            {bodyWidth <= 375 && (
                <div className={style["comment__mobile-counter-and-ctas"]}>
                    <ReactionCounter score={comment.score} />
                    <CallToActions
                        isOwnComment={currentUser.username === comment.user.username}
                        comment={comment}
                    />
                </div>
            )}
        </div>
    );
}
