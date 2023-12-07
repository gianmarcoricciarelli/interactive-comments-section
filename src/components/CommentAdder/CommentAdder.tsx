import { ChangeEvent, useContext, useState } from 'react';
import { ICommentWithReplies, IUser } from '../../types/types';
import style from './CommentAdder.module.scss';
import { CallToActionsContext } from '../../contexts/CallToActionsContextProvider';

interface ICommentAdder {
    currentUser: IUser;
    replyingTo?: ICommentWithReplies;
    topLevelReply: boolean;
}

export function CommentAdder({ currentUser, replyingTo, topLevelReply }: ICommentAdder) {
    console.log('replyingTo:', replyingTo);
    const [comment, setComment] = useState('');

    const { onAddComment, onReplyToComment } = useContext(CallToActionsContext);

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
        <div className={`${style['comment-adder']} ${replyingTo && !topLevelReply ? style['comment-adder__reply'] : ''}`}>
            <img src={`/src/assets/images/avatars/image-${currentUser.username}.png`} />
            <textarea placeholder="Add a comment..." value={comment} onChange={onChangeHandler} />
            <button onClick={onClickHandler}>SEND</button>
        </div>
    );
}
