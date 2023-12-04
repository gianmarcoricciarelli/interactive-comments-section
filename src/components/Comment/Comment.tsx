import { ICommentWithReplies } from '../../types/types';
import { Content } from '../Content/Content';
import { ReactionCounter } from '../ReactionCounter/ReactionCounter';
import style from './Comment.module.scss';

export interface CommentInterface {
    currentUserName: string;
    comment: ICommentWithReplies;
}

export function Comment({ currentUserName, comment }: CommentInterface) {
    return (
        <>
            <div className={style['comment']}>
                <ReactionCounter score={comment.score} />
                <Content currentUserName={currentUserName} comment={comment} />
            </div>
            {!!comment.replies?.length && (
                <div className={style['vertical-line-and-replies']}>
                    <div className={style['vertical-line-and-replies__line']} />
                    <div className={style['vertical-line-and-replies__replies']}>
                        {comment.replies.map((reply) => (
                            <div key={reply.id} className={`${style['comment']} ${style['reply']}`}>
                                <ReactionCounter score={reply.score} />
                                <Content currentUserName={currentUserName} comment={reply} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
