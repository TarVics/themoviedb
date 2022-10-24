import React, {useEffect} from 'react';
import {useSearchParams} from "react-router-dom";

import {genresActions, moviesActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {MoviesList} from "../../components";

const MoviesListPage = () => {
    const {i18n} = useAppSelector(state => state.i18nReducer);
    const dispatch = useAppDispatch();
    const [query] = useSearchParams({page: '1'});

    useEffect(() => {
        dispatch(genresActions.getGenres(i18n.encode));
    }, [dispatch, i18n.encode]);

    useEffect(() => {
        dispatch(moviesActions.getMovies({
            page: query.get('page'),
            genres: query.get('genres'),
            query: query.get('query'),
            language: i18n.encode
        }));
    }, [query, i18n.encode, dispatch]);

    return (
       <MoviesList/>
    );
};

export {MoviesListPage}