import { Comment } from './components/Comment/Comment';
import style from './InteractiveCommentsSection.module.scss';
import dataJson from '../data.json';
import { useState } from 'react';
import { CommentsData } from './types/types';
import { CommentAdder } from './components/CommentAdder/CommentAdder';
import { CallToActionsContextProvider } from './contexts/CallToActionsContextProvider';

export function InteractiveCommentsSection() {
    const [data, setData] = useState<CommentsData>(dataJson);
    const [nextCommentId, setNextCommentId] = useState(5);
    const [commentsWithCommentAdder, setCommentsWithCommentAdder] = useState<number[]>([]);

    return (
        <CallToActionsContextProvider
            commentsWithCommentAdder={commentsWithCommentAdder}
            addCommentAdderToComment={setCommentsWithCommentAdder}
            onUpdateData={setData}
            onCurrentUserAddedComment={setNextCommentId}
            nextCommentId={nextCommentId}
        >
            <div className={style['interactive-comment-section']}>
                <div className={style['interactive-comment-section__comments-container']}>
                    {data.comments.map((comment) => (
                        <>
                            <Comment key={comment.id} comment={comment} currentUser={data.currentUser} />
                            {commentsWithCommentAdder.includes(comment.id) && (
                                <CommentAdder currentUser={data.currentUser} replyingTo={comment} />
                            )}
                        </>
                    ))}
                </div>
                <CommentAdder currentUser={data.currentUser} />
            </div>
        </CallToActionsContextProvider>
    );
}
