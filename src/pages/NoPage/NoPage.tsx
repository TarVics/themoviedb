import React from 'react';

import css from "./NoPage.module.css"
import {useAppSelector} from "../../hooks";

const NoPage = () => {
    const {i18n} = useAppSelector(state => state.i18nReducer);
    return (
        <div className={css.wrapper}>
            <div className={css.content}>
                <h1>{i18n.value.PAGE_NOT_FOUND}</h1>
            </div>
        </div>
    );
};

export {NoPage}