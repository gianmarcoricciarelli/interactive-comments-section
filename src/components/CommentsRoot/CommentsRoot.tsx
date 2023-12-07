import { useContext } from 'react';
import { IComment } from '../../types/types';
import { Comment } from '../Comment/Comment';
import style from './CommentsRoot.module.scss';
import { SectionContext } from '../../contexts/SectionContext';
import { CommentAdder } from '../CommentAdder/CommentAdder';

interface ICommentsRoot {
    comments: IComment[];
    repliesContainerWidth?: number;
}

export function CommentsRoot({ comments, repliesContainerWidth = 580 }: ICommentsRoot) {
    const { currentUser, commentsWithCommentAdder } = useContext(SectionContext);

    return (
        <div className={style['comments-root']} style={{ width: repliesContainerWidth }}>
            {comments.map((comment) => (
                <>
                    <Comment key={comment.id} comment={comment} currentUser={currentUser!} containerWidth={repliesContainerWidth} />
                    {commentsWithCommentAdder!.includes(comment.id) && (
                        <CommentAdder currentUser={currentUser!} replyingTo={comment} containerWidth={repliesContainerWidth} />
                    )}
                    {!!comment.replies?.length && (
                        <div className={style['comments-root__replies-container']} style={{ width: repliesContainerWidth }}>
                            <div className={style['replies-container__line']} />
                            <div className={style['replies-container__replies']} style={{ width: repliesContainerWidth - 60 }}>
                                <CommentsRoot comments={comment.replies} repliesContainerWidth={repliesContainerWidth - 60} />
                            </div>
                        </div>
                    )}
                </>
            ))}
        </div>
    );
}
