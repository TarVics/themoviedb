import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";

import {moviesActions} from "../../redux";
import {IMovieDetails} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {MovieInfo} from "../../components";

const MovieInfoPage = () => {
    const {i18n} = useAppSelector(state => state.i18nReducer);
    const params = useParams();
    const dispatch = useAppDispatch();
    const {current: movie} = useAppSelector(state => state.moviesReducer);

    useEffect(() => {
        const {id} = params;
        dispatch(moviesActions.setCurrent(null));
        dispatch(moviesActions.getMovieById({id: id as string, language: i18n.encode}));
// eslint-disable-next-line
    }, [params, dispatch, i18n.encode]);

    return (
        <>
            {movie && <MovieInfo movie={movie as IMovieDetails}/>}
        </>

    );
};

export {MovieInfoPage}