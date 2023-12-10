import type { IComment } from "../../../types/types";
import { Content } from "./Content/Content";
import { ReactionCounter } from "./ReactionCounter/ReactionCounter";
import style from "./Comment.module.scss";
import React, { useContext } from "react";
import { SectionContext } from "../../../contexts/SectionContext";

export interface CommentInterface {
    comment: IComment;
}

export function Comment({ comment }: CommentInterface): React.JSX.Element {
    const { bodyWidth, currentUser } = useContext(SectionContext);

    return (
        <div className={style.comment}>
            {bodyWidth > 375 && <ReactionCounter score={comment.score} />}
            <Content currentUserName={currentUser.username} comment={comment} />
        </div>
    );
}
