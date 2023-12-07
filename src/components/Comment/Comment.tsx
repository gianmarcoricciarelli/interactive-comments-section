import { useContext } from 'react';
import { IComment, IUser } from '../../types/types';
import { Content } from '../Content/Content';
import { ReactionCounter } from '../ReactionCounter/ReactionCounter';
import style from './Comment.module.scss';
import { CommentAdder } from '../CommentAdder/CommentAdder';
import { CallToActionsContext } from '../../contexts/CallToActionsContextProvider';

export interface CommentInterface {
    currentUser: IUser;
    comment: IComment;
    containerWidth: number;
}

export function Comment({ currentUser, comment, containerWidth }: CommentInterface) {
    const { commentsWithCommentAdder } = useContext(CallToActionsContext);

    return (
        <div className={style['comment']} style={{ width: containerWidth }}>
            <ReactionCounter score={comment.score} />
            <Content currentUserName={currentUser.username} comment={comment} />
        </div>
    );
}
