import type { ChangeEvent } from "react";

import React, { useContext, useState } from "react";
import style from "./EditCommentForm.module.scss";
import { SectionContext } from "../../contexts/SectionContext";

interface IEditCommentForm {
    commentId: number;
    previousText: string;
}

export function EditCommentForm({ commentId, previousText }: IEditCommentForm): React.JSX.Element {
    const [editedComment, setEditedComment] = useState(previousText);

    const { onEditComment } = useContext(SectionContext);

    const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setEditedComment(event.target.value);
    };
    const onClickHandler = (): void => {
        onEditComment!(commentId, editedComment);
    };

    return (
        <div className={style["edit-comment-form"]}>
            <textarea value={editedComment} onChange={onChangeHandler} />
            <button
                disabled={editedComment === previousText || editedComment.length === 0}
                onClick={onClickHandler}
            >
                UPDATE
            </button>
        </div>
    );
}
