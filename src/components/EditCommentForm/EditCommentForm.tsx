import { ChangeEvent, useContext, useState } from 'react';
import style from './EditCommentForm.module.scss';
import { SectionContext } from '../../contexts/SectionContext';

interface IEditCommentForm {
    commentId: number;
    previousText: string;
}

export function EditCommentForm({ commentId, previousText }: IEditCommentForm) {
    const [editedComment, setEditedComment] = useState(previousText);

    const { onEditComment } = useContext(SectionContext);

    const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setEditedComment(event.target.value);
    };
    const onClickHandler = () => {
        onEditComment(commentId, editedComment);
    };

    return (
        <div className={style['edit-comment-form']}>
            <textarea value={editedComment} onChange={onChangeHandler} />
            <button onClick={onClickHandler}>UPDATE</button>
        </div>
    );
}
