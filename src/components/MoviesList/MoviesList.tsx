import React, {useEffect, useRef, useState} from 'react';
import {useSearchParams} from "react-router-dom";

import css from "./MovieList.module.css";
import {useAppDispatch, useAppSelector, useThemeContext, useWindowResize} from "../../hooks";
import {genresActions, moviesActions} from "../../redux";
import {MoviesListCard} from "..";

type ISizes = {count: number, values: number[]}

const MoviesList = () => {
    const {language} = useThemeContext();
    const dispatch = useAppDispatch();
    const [query] = useSearchParams({page: '1'});
    const {movies} = useAppSelector(state => state.moviesReducer);
    const [width] = useWindowResize();
    const moviesRef = useRef<HTMLDivElement>(null);
    const [sizes, setSizes] = useState<ISizes>({count: 0, values: []})

    useEffect(() => {
        dispatch(genresActions.getGenres(language.encode));
    }, [dispatch, language]);

    useEffect(() => {
        dispatch(moviesActions.getMovies({
            page: query.get('page'),
            genres: query.get('genres'),
            query: query.get('query'),
            language: language.encode
        }));
    }, [query, language, dispatch]);

    useEffect(() => {
        setSizes((prev: ISizes) => {
            prev.count = 0;
            prev.values.length = 0;
            return prev;
        })
    }, [movies, width])

    const onResize = (index: number, node: Node, width: number, height: number) => {
        setSizes((prev: ISizes) => {
            prev.count++;
            const needRefresh = prev.values[index] !== height;
            prev.values[index] = height;

            // return movies.length - 1 === index ? {...prev} : prev;
            // return prev.values.findIndex(value => value === undefined) ? prev : {...prev}
            return needRefresh ? {...prev} : prev;
        })
    }

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

            const values = sizes.values;
            const count = values.length;
            const cardCount = Math.ceil(count / columnsCount);

            for (let i = 0; i < count; i++) {
                const height = values[i] || 500;

                currentHeight += rowGap + height;

                if ((i + 1) % cardCount === 0) {
                    currentHeight += offset;
                    columnHeight = Math.max(columnHeight, currentHeight);
                    currentHeight = 0;
                }
            }

            if (currentHeight > 0) {
                currentHeight += offset;
                columnHeight = Math.max(columnHeight, currentHeight);
                // currentHeight = 0;
            }

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

        resize();
    }, [sizes, width]);

    return (
        <div className={css.wrapper} ref={moviesRef}>
            {movies.map((movie, index) =>
                <MoviesListCard key={movie.id} movie={movie} onResize={
                    (node, width, height) => onResize(index, node, width, height)} />)
            }
        </div>
    );
};

export {MoviesList}