import iconReply from '../../../assets/images/icon-reply.svg';
import iconEdit from '../../../assets/images/icon-edit.svg';
import iconDelete from '../../../assets/images/icon-delete.svg';
import style from './CallToActions.module.scss';
import { useContext } from 'react';
import { SectionContext } from '../../../contexts/SectionContext';
import { IComment } from '../../../types/types';

interface ICallToActions {
    isOwnComment: boolean;
    comment: IComment;
}

export function CallToActions({ isOwnComment, comment }: ICallToActions) {
    const { addAddFormToComment } = useContext(SectionContext);

    const onReplyClickHandler = () => {
        addAddFormToComment!((prevCommentsWithAddForm) => [...prevCommentsWithAddForm, comment.id]);
    };
    const onEditClickHandler = () => {
        console.log('hello');
    };

    return (
        <div className={style['call-to-actions']}>
            {!isOwnComment ? (
                <div className={style['call-to-actions__edit-cta']} onClick={onReplyClickHandler}>
                    <img src={iconReply} />
                    <p>Reply</p>
                </div>
            ) : (
                <div className={style['call-to-actions__personal-ctas']}>
                    <div className={style['personal-ctas__cta']}>
                        <img src={iconDelete} />
                        <p>Delete</p>
                    </div>
                    <div className={style['personal-ctas__cta']} onClick={onEditClickHandler}>
                        <img src={iconEdit} />
                        <p>Edit</p>
                    </div>
                </div>
            )}
        </div>
    );
}
