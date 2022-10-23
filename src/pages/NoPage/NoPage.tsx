import React from 'react';

import css from "./NoPage.module.css"

const NoPage = () => {
    return (
        <div className={css.wrapper}>
            <div className={css.content}>
                <h1>Page not found</h1>
            </div>
        </div>
    );
};

export {NoPage}