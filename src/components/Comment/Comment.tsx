import { IComment, IUser } from '../../types/types';
import { Content } from './Content/Content';
import { ReactionCounter } from './ReactionCounter/ReactionCounter';
import style from './Comment.module.scss';

export interface CommentInterface {
    currentUser: IUser;
    comment: IComment;
    containerWidth: number;
}

export function Comment({ currentUser, comment, containerWidth }: CommentInterface) {
    return (
        <div className={style['comment']} style={{ width: containerWidth }}>
            <ReactionCounter score={comment.score} />
            <Content currentUserName={currentUser.username} comment={comment} />
        </div>
    );
}
