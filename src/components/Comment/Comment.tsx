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
}

export function Comment({ currentUser, comment }: CommentInterface) {
    const { commentsWithCommentAdder } = useContext(CallToActionsContext);

    return (
        <>
            <div className={style['comment']}>
                <ReactionCounter score={comment.score} />
                <Content currentUserName={currentUser.username} comment={comment} />
            </div>
            {!!comment.replies?.length && (
                <div className={style['vertical-line-and-replies']}>
                    <div className={style['vertical-line-and-replies__line']} />
                    <div className={style['vertical-line-and-replies__replies']}>
                        {comment.replies.map((reply) => (
                            <>
                                <div key={reply.id} className={`${style['comment']} ${style['reply']}`}>
                                    <ReactionCounter score={reply.score} />
                                    <Content currentUserName={currentUser.username} comment={reply} />
                                </div>
                                {commentsWithCommentAdder!.includes(reply.id) && (
                                    <CommentAdder currentUser={currentUser} replyingTo={reply} />
                                )}
                            </>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
