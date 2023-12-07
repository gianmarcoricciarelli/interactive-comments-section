import style from './Content.module.scss';
import { CallToActions } from './CallToActions/CallToActions';
import { ICommentWithReplies } from '../../types/types';

interface IContent {
    currentUserName: string;
    comment: ICommentWithReplies;
}

export function Content({ currentUserName, comment }: IContent) {
    return (
        <div className={style['content']}>
            <div className={style['content__header']}>
                <div className={style['header__content']}>
                    <img src={`/src/assets/images/avatars/image-${comment.user.username}.png`} />
                    <p>{comment.user.username}</p>
                    {currentUserName === comment.user.username && (
                        <div className={style['header__you-box']}>
                            <p>you</p>
                        </div>
                    )}
                    <p>{comment.createdAt}</p>
                </div>
                <CallToActions isOwnComment={currentUserName === comment.user.username} comment={comment} />
            </div>
            <div className={style['content__text-container']}>
                <p>
                    <span>{comment.replyingTo ? `@${comment.replyingTo}` : ''}</span> {comment.content}
                </p>
            </div>
        </div>
    );
}