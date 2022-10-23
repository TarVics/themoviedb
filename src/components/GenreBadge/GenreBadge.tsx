import React, {FC} from 'react';

import css from "./GenreBadge.module.css";

interface IProps {
    text: string
    warning?: boolean,
}

const GenreBadge: FC<IProps> = ({warning, text}) => {
    return (
        <span className={warning ? css.warning : css.badger}>{text}</span>
    );
};

export {GenreBadge}