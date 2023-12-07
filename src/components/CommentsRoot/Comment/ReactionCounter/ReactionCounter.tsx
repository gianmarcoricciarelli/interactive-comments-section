import { useState } from 'react';
import plusIcon from '../../../../assets/images/icon-plus.svg';
import minusIcon from '../../../../assets/images/icon-minus.svg';
import style from './ReactionCounter.module.scss';

interface IReactionCounter {
    score: number;
}

export function ReactionCounter({ score }: IReactionCounter) {
    const [count, setCount] = useState(score);

    const onAddHandler = () => {
        setCount((prevCount) => {
            return prevCount + 1;
        });
    };
    const onSubHandler = () => {
        setCount((prevCount) => {
            return prevCount - 1;
        });
    };

    return (
        <div className={style['reaction-counter']}>
            <div className={style['reaction-counter__img-container']} onClick={onAddHandler}>
                <img src={plusIcon} />
            </div>
            <span className={style['reaction-counter__count']}>{count}</span>
            <div className={style['reaction-counter__img-container']} onClick={onSubHandler}>
                <img src={minusIcon} />
            </div>
        </div>
    );
}
