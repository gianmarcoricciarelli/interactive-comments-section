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
    const [isCommentAdderHidden, setIsCommentAdderHidden] = useState(false);

    return (
        <CallToActionsContextProvider
            onUpdateData={setData}
            onCurrentUserAddedComment={setNextCommentId}
            onCurrentUserRepliesToComment={setIsCommentAdderHidden}
            nextCommentId={nextCommentId}
        >
            <div className={style['interactive-comment-section']}>
                <div className={style['interactive-comment-section__comments-container']}>
                    {data.comments.map((comment) => (
                        <Comment key={comment.id} comment={comment} currentUserName={data.currentUser.username} />
                    ))}
                </div>
                {!isCommentAdderHidden && <CommentAdder currentUser={data.currentUser} />}
            </div>
        </CallToActionsContextProvider>
    );
}
