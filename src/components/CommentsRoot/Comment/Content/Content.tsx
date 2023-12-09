import type { IComment } from "../../../../types/types";
import style from "./Content.module.scss";
import { CallToActions } from "./CallToActions/CallToActions";
import React, { useContext } from "react";
import { SectionContext } from "../../../../contexts/SectionContext";
import { EditCommentForm } from "../../../EditCommentForm/EditCommentForm";

interface IContent {
    currentUserName: string;
    comment: IComment;
}

export function Content({ currentUserName, comment }: IContent): React.JSX.Element {
    const { commentsWithEditForm } = useContext(SectionContext);

    return (
        <div className={style.content}>
            <div className={style.content__header}>
                <div className={style.header__content}>
                    <img src={`/src/assets/images/avatars/image-${comment.user.username}.png`} />
                    <p>{comment.user.username}</p>
                    {currentUserName === comment.user.username && (
                        <div className={style["header__you-box"]}>
                            <p>you</p>
                        </div>
                    )}
                    <p>{comment.createdAt}</p>
                </div>
                <CallToActions
                    isOwnComment={currentUserName === comment.user.username}
                    comment={comment}
                />
            </div>
            <div className={style["content__text-container"]}>
                {commentsWithEditForm.includes(comment.id) ? (
                    <EditCommentForm commentId={comment.id} previousText={comment.content} />
                ) : (
                    <p>
                        <span>
                            {comment.replyingTo !== undefined ? `@${comment.replyingTo}` : ""}
                        </span>{" "}
                        {comment.content}
                    </p>
                )}
            </div>
        </div>
    );
}
