import React, {FC} from 'react';

import css from "./MovieInfo.module.css"

interface IProps {
    caption?: string
    text?: string
}

const MovieInfoRow: FC<IProps> = ({caption, text}) => {
    return (
        <div>
            {caption && <span className={css.caption}>{caption + (text ? ': ' : '')}</span>}
            {text && <span className={css.text}>{text}</span>}
        </div>
    )
}

export {MovieInfoRow}