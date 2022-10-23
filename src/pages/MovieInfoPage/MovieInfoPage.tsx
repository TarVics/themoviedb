import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";

import {MovieInfo} from "../../components";
import {useAppDispatch, useAppSelector, useThemeContext} from "../../hooks";
import {moviesActions} from "../../redux";
import {IMovieDetails} from "../../interfaces";

const MovieInfoPage = () => {
    const {language} = useThemeContext();
    const params = useParams();
    const dispatch = useAppDispatch();
    const {current: movie} = useAppSelector(state => state.moviesReducer);

    useEffect(() => {
        const {id} = params;
        dispatch(moviesActions.setCurrent(null));
        dispatch(moviesActions.getMovieById({id: id as string, language: language.encode}));
// eslint-disable-next-line
    }, [params, dispatch, language]);

    return (
        <>
            {movie && <MovieInfo movie={movie as IMovieDetails}/>}
        </>

    );
};

export {MovieInfoPage}