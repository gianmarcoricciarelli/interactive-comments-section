import type { IComment } from "../../../../../types/types";
import iconReply from "../../../../../assets/images/icon-reply.svg";
import iconEdit from "../../../../../assets/images/icon-edit.svg";
import iconDelete from "../../../../../assets/images/icon-delete.svg";
import style from "./CallToActions.module.scss";
import React, { useContext } from "react";
import { SectionContext } from "../../../../../contexts/SectionContext";

interface ICallToActions {
    isOwnComment: boolean;
    comment: IComment;
}

export function CallToActions({ isOwnComment, comment }: ICallToActions): React.JSX.Element {
    const { setCommentsWithAddForm, setCommentsWithEditForm, setModalIsOpen, setCommentToDelete } =
        useContext(SectionContext);

    const onReplyClickHandler = (): void => {
        setCommentsWithAddForm!((prevCommentsWithAddForm) => [
            ...prevCommentsWithAddForm,
            comment.id,
        ]);
    };
    const onEditClickHandler = (): void => {
        setCommentsWithEditForm!((prevCommentsWithEditForm) => [
            ...prevCommentsWithEditForm,
            comment.id,
        ]);
    };
    const onDeleteClickHandler = (): void => {
        setModalIsOpen!(true);
        setCommentToDelete!(comment.id);
    };

    return (
        <div className={style["call-to-actions"]}>
            {!isOwnComment ? (
                <div className={style["call-to-actions__reply-cta"]} onClick={onReplyClickHandler}>
                    <img src={iconReply} />
                    <p>Reply</p>
                </div>
            ) : (
                <div className={style["call-to-actions__personal-ctas"]}>
                    <div className={style["personal-ctas__cta"]} onClick={onDeleteClickHandler}>
                        <img src={iconDelete} />
                        <p>Delete</p>
                    </div>
                    <div className={style["personal-ctas__cta"]} onClick={onEditClickHandler}>
                        <img src={iconEdit} />
                        <p>Edit</p>
                    </div>
                </div>
            )}
        </div>
    );
}
