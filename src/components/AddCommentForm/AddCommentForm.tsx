import { ChangeEvent, useContext, useState } from 'react';
import { IComment, IUser } from '../../types/types';
import style from './AddCommentForm.module.scss';
import { SectionContext } from '../../contexts/SectionContext';

interface IAddACommentForm {
    currentUser: IUser;
    replyingTo?: IComment;
    containerWidth?: number;
}

export function AddACommentForm({ currentUser, replyingTo, containerWidth = 580 }: IAddACommentForm) {
    const [comment, setComment] = useState('');

    const { onAddComment, onReplyToComment } = useContext(SectionContext);

    const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    };
    const onClickHandler = () => {
        if (!replyingTo) {
            onAddComment!(comment);
        } else {
            onReplyToComment!(replyingTo, comment, currentUser);
        }
        setComment('');
    };

    return (
        <div className={`${style['comment-adder']}`} style={{ width: containerWidth }}>
            <img src={`/src/assets/images/avatars/image-${currentUser.username}.png`} />
            <textarea placeholder="Add a comment..." value={comment} onChange={onChangeHandler} />
            <button onClick={onClickHandler}>SEND</button>
        </div>
    );
}
