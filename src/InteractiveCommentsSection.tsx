import style from "./InteractiveCommentsSection.module.scss";
import React from "react";
import { SectionContextProvider } from "./contexts/SectionContext";
import { CommentsRoot } from "./components/CommentsRoot/CommentsRoot";
import { AddACommentForm } from "./components/AddCommentForm/AddCommentForm";
import { ConfirmDeleteModal } from "./components/ConfirmDeleteModal/ConfirmDeleteModal";

export function InteractiveCommentsSection(): React.JSX.Element {
    return (
        <SectionContextProvider>
            <>
                <div className={style["interactive-comment-section"]}>
                    <CommentsRoot />
                    <AddACommentForm />
                </div>
                <ConfirmDeleteModal />
            </>
        </SectionContextProvider>
    );
}
