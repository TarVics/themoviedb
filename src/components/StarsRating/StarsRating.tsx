import React, {FC} from 'react';

import css from "./StarsRating.module.css"
import {Rating} from "..";

interface IProps {
    value: number,
    text: string
}

const StarsRating: FC<IProps> = ({value, text}) => {

    return (
        <>
            {value ? <span className={css.text}>{value}</span> : null}
            {<Rating
                stop={6}
                emptySymbol={css.Rating + " fa fa-star-o"}
                fullSymbol={css.Rating + " fa fa-star"}
                fractions={4}
                initialRating={value * 0.6}
                readonly={true}
                className={css.text}
            />}
            {text ? <span className={css.text}>{text}</span> : null}
        </>
    );
};

export {StarsRating}