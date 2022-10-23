import React, {FC} from 'react';

import css from "./PosterPreview.module.css";

interface IProps {
    src: string,
    title: string
}

const PosterPreview: FC<IProps> = ({src, title}) => {
    return (
        <img className={css.PosterPreview} alt={title} src={src} />
    );
};

export {PosterPreview}