import React, { useContext, useState } from "react";
import type { ChangeEvent } from "react";
import type { IComment } from "../../types/types";
import style from "./AddCommentForm.module.scss";
import { SectionContext } from "../../contexts/SectionContext";

interface IAddACommentForm {
    replyingTo?: IComment;
    containerWidth?: number;
}

export function AddACommentForm({
    replyingTo,
    containerWidth = 580,
}: IAddACommentForm): React.JSX.Element {
    const [comment, setComment] = useState("");

    const { currentUser, onAddComment, onReplyToComment } = useContext(SectionContext);

    const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setComment(event.target.value);
    };
    const onClickHandler = (): void => {
        if (replyingTo === undefined) {
            onAddComment!(comment);
        } else {
            onReplyToComment!(replyingTo, comment, currentUser);
        }
        setComment("");
    };

    return (
        <div className={`${style["add-comment-form"]}`} style={{ width: containerWidth }}>
            <img src={`/src/assets/images/avatars/image-${currentUser.username}.png`} />
            <textarea placeholder="Add a comment..." value={comment} onChange={onChangeHandler} />
            <button disabled={comment.length === 0} onClick={onClickHandler}>
                SEND
            </button>
        </div>
    );
}
