import { ChangeEvent, useContext, useState } from 'react';
import { IUser } from '../../types/types';
import style from './CommentAdder.module.scss';
import { CallToActionsContext } from '../../contexts/CallToActionsContextProvider';

interface ICommentAdder {
    currentUser: IUser;
    replyingTo?: number;
}

export function CommentAdder({ currentUser, replyingTo }: ICommentAdder) {
    const [comment, setComment] = useState('');

    const { onAddComment, onReplyToComment } = useContext(CallToActionsContext);

    const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    };
    const onClickHandler = () => {
        if (!replyingTo) {
            onAddComment!(comment);
        } else {
            onReplyToComment!();
        }
        setComment('');
    };

    return (
        <div className={style['comment-adder']}>
            <img src={`/src/assets/images/avatars/image-${currentUser.username}.png`} />
            <textarea placeholder="Add a comment..." value={comment} onChange={onChangeHandler} />
            <button onClick={onClickHandler}>SEND</button>
        </div>
    );
}
