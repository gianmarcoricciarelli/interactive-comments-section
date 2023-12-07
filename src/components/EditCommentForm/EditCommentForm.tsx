import { ChangeEvent, useState } from 'react';
import style from './EditCommentForm.module.scss';

interface IEditCommentForm {
    previousText: string;
}

export function EditCommentForm({ previousText }: IEditCommentForm) {
    const [editedComment, setEditedComment] = useState(previousText);

    const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setEditedComment(event.target.value);
    };
    const onClickHandler = () => {};

    return (
        <div className={style['edit-comment-form']}>
            <textarea value={editedComment} onChange={onChangeHandler} />
            <button onClick={onClickHandler}>UPDATE</button>
        </div>
    );
}
