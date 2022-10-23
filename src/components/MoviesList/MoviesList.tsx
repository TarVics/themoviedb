import React, {useEffect, useRef} from 'react';

import css from "./MovieList.module.css";
import {useAppSelector, useWindowResize} from "../../hooks";
import {MoviesListCard} from "..";


const MoviesList = () => {
    const {movies} = useAppSelector(state => state.moviesReducer);
    const [width] = useWindowResize();
    const moviesRef = useRef<HTMLDivElement>(null);
    // const timerRef = useRef<ReturnType<typeof setTimeout>>(null)
    const timerRef: { current: NodeJS.Timeout | null } = useRef(null);

    useEffect(() => {
        const resize = () => {
            let columnsCount;
            let wrapWidth;

            if (width >= 1280) { /* 4 columns */
                columnsCount = 4;
                wrapWidth = 1280;
            } else if (width >= 1024 && width < 1280) { /* 3 columns */
                columnsCount = 3;
                wrapWidth = 940;
            } else if (width >= 600 && width < 1024) { /* 2 columns */
                columnsCount = 2;
                wrapWidth = 620;
            } else { /* 1 column */
                columnsCount = 1;
                wrapWidth = 300;
            }
            const rowGap = 20;
            const offset = 200;
            let columnHeight = 0;
            let currentHeight = 0;

            if (moviesRef.current) {
                // console.log('RENDER');

                const values = moviesRef.current.children;
                const count = values.length;
                const cardCount = Math.round(count / columnsCount /*+ 0.5*/);

                // console.log('CC', cardCount, columnsCount);

                for (let i = 0; i < count; i++) {
                    const child = values[i];

                    currentHeight += rowGap + child.clientHeight;

                    if ((i + 1) % cardCount === 0) {
                        currentHeight += offset;
                        // console.log('WW', currentHeight);
                        columnHeight = Math.max(columnHeight, currentHeight);
                        currentHeight = 0;
                    }
                }
            } else {
                // console.log('HEIGHT EMPTY');
            }

            if (currentHeight > 0) {
                currentHeight += offset;
                // console.log('WW', currentHeight);
                columnHeight = Math.max(columnHeight, currentHeight);
                // currentHeight = 0;
            }

            // console.log('RR', columnHeight);

            if (moviesRef.current) {
                if (columnsCount === 1) {
                    moviesRef.current.style.height = 'unset';
                } else if (columnHeight > 0) {
                    moviesRef.current.style.height = columnHeight + 'px';
                } else {
                    moviesRef.current.style.height = '';
                }
                moviesRef.current.style.width = wrapWidth + 'px';
            }
        }

        if (moviesRef.current) {
            moviesRef.current.style.height = '';
        }

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => resize(), 500);
    }, [movies, width])

    return (
        <div className={css.wrapper} ref={moviesRef}>
            {movies.map((movie) =>
                <MoviesListCard key={movie.id} movie={movie} />)
            }
        </div>
    );
};

export {MoviesList}