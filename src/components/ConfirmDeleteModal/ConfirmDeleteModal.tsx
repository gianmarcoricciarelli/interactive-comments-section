import React, { useContext, useEffect } from "react";
import { SectionContext } from "../../contexts/SectionContext";
import style from "./ConfirmDeleteModal.module.scss";

export function ConfirmDeleteModal(): React.JSX.Element | null {
    const { modalIsOpen, setModalIsOpen, onDeleteComment, commentToDelete } =
        useContext(SectionContext);

    const onClickOnOverlayOrCancelButton = (): void => {
        setModalIsOpen!(false);
    };
    const onDialogClick = (event: React.MouseEvent<HTMLDivElement>): void => {
        event.stopPropagation();
    };
    const onDeleteClickHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        onDeleteComment!(commentToDelete);
        setModalIsOpen!(false);
    };

    useEffect(() => {
        const onEscKeyPressedHandler = (event: KeyboardEvent): void => {
            if (event.code === "Escape" && modalIsOpen) {
                setModalIsOpen!(false);
            }
        };

        if (modalIsOpen) {
            window.addEventListener("keydown", onEscKeyPressedHandler);
        }

        return () => {
            window.removeEventListener("keydown", onEscKeyPressedHandler);
        };
    }, [modalIsOpen]);

    if (!modalIsOpen) {
        return null;
    }

    return (
        <div className={style["confirm-delete-modal"]} onClick={onClickOnOverlayOrCancelButton}>
            <div className={style["confirm-delete-modal__dialog"]} onClick={onDialogClick}>
                <div className={style["dialog__text-container"]}>
                    <h1>Delete comment</h1>
                    <p>
                        {`Are you sure you want to delete this comment? This will remove the comment
                        and can't be undone.`}
                    </p>
                </div>
                <div className={style["dialog__button-container"]}>
                    <button onClick={onClickOnOverlayOrCancelButton}>NO, CANCEL</button>
                    <button onClick={onDeleteClickHandler}>YES, DELETE</button>
                </div>
            </div>
        </div>
    );
}
