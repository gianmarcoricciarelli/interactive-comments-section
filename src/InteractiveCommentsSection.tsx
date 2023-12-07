import style from './InteractiveCommentsSection.module.scss';
import dataJson from '../data.json';
import { useState } from 'react';
import { CommentsData } from './types/types';
import { CallToActionsContextProvider } from './contexts/CallToActionsContextProvider';
import { CommentsRoot } from './components/CommentsRoot/CommentsRoot';
import { CommentAdder } from './components/CommentAdder/CommentAdder';

export function InteractiveCommentsSection() {
    const [data, setData] = useState<CommentsData>(dataJson);
    const [nextCommentId, setNextCommentId] = useState(5);
    const [commentsWithCommentAdder, setCommentsWithCommentAdder] = useState<number[]>([]);

    return (
        <CallToActionsContextProvider
            currentUser={data.currentUser}
            commentsWithCommentAdder={commentsWithCommentAdder}
            addCommentAdderToComment={setCommentsWithCommentAdder}
            onUpdateData={setData}
            onCurrentUserAddedComment={setNextCommentId}
            nextCommentId={nextCommentId}
        >
            <div className={style['interactive-comment-section']}>
                <CommentsRoot comments={data.comments} />
                <CommentAdder currentUser={data.currentUser} />
            </div>
        </CallToActionsContextProvider>
    );
}
