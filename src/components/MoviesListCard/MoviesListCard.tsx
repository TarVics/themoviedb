import React, {FC} from 'react';
import {Link, useNavigate} from "react-router-dom";

import css from "./MoviesListCard.module.css";
import {tmDbService} from "../../services";
import {useAppSelector} from "../../hooks";
import {IMovie} from "../../interfaces";
import {GenreBadge, PosterPreview, StarsRating} from "..";

interface IProps {
    movie: IMovie
}

const MoviesListCard: FC<IProps> = ({movie}) => {
    const {genres} = useAppSelector(state => state.genresReducer);
    const navigate = useNavigate();

    let overview = movie.overview;
    const isLongOverview = overview.length > 128;
    if (isLongOverview) {
        overview = overview.substring(0, overview.lastIndexOf(' ', 128)) + ' ';
    }

    const posterSrc = movie.backdrop_path || movie.poster_path;

    return (
        <div
            className={css.MoviesListCard}
            onClick={() => navigate(movie.id.toString())}
        >
            {posterSrc && <PosterPreview
                title={movie.title}
                src={tmDbService.getPoster(posterSrc, 300)}/>}
            <div className={css.body}>
                <h5>{movie.title}</h5>
                <div>
                    {movie.genre_ids && movie.genre_ids.map(genre =>
                        <GenreBadge key={genre} text={genres[genre] ? genres[genre].name : ''}/>
                    )}
                </div>

                <div className={css.text}>
                    {overview}
                    {isLongOverview && <Link className={css.link} to={movie.id.toString()}>more...</Link>}
                </div>
                <div className={css.footer}>
                    <StarsRating value={movie.vote_average} text={movie.vote_count.toString()}/>
                </div>
            </div>
        </div>
    );


};

export {MoviesListCard}
