import style from './InteractiveCommentsSection.module.scss';
import dataJson from '../data.json';
import { useState } from 'react';
import { CommentsData } from './types/types';
import { SectionContextProvider } from './contexts/SectionContext';
import { CommentsRoot } from './components/CommentsRoot/CommentsRoot';
import { AddACommentForm } from './components/AddCommentForm/AddCommentForm';

export function InteractiveCommentsSection() {
    const [data, setData] = useState<CommentsData>(dataJson);
    const [nextCommentId, setNextCommentId] = useState(5);
    const [commentsWithAddForm, setCommentsWithAddForm] = useState<number[]>([]);
    const [commentsWithEditForm, setCommentsWithEditForm] = useState<number[]>([]);

    return (
        <SectionContextProvider
            currentUser={data.currentUser}
            commentsWithAddForm={commentsWithAddForm}
            addAddFormToComment={setCommentsWithAddForm}
            commentsWithEditForm={commentsWithEditForm}
            addEditFormToComment={setCommentsWithEditForm}
            onUpdateData={setData}
            onCurrentUserAddedComment={setNextCommentId}
            nextCommentId={nextCommentId}
        >
            <div className={style['interactive-comment-section']}>
                <CommentsRoot comments={data.comments} />
                <AddACommentForm currentUser={data.currentUser} />
            </div>
        </SectionContextProvider>
    );
}
