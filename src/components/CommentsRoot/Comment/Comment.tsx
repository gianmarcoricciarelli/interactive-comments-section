import type { IComment } from "../../../types/types";
import { Content } from "./Content/Content";
import { ReactionCounter } from "./ReactionCounter/ReactionCounter";
import style from "./Comment.module.scss";
import React, { useContext } from "react";
import { SectionContext } from "../../../contexts/SectionContext";

export interface CommentInterface {
    comment: IComment;
    containerWidth: number;
}

export function Comment({ comment, containerWidth }: CommentInterface): React.JSX.Element {
    const { currentUser } = useContext(SectionContext);

    return (
        <div className={style.comment} style={{ width: containerWidth }}>
            <ReactionCounter score={comment.score} />
            <Content currentUserName={currentUser.username} comment={comment} />
        </div>
    );
}
