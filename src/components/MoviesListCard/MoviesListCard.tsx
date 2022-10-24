import React, {FC, useEffect, useRef} from 'react';
import {Link, useNavigate} from "react-router-dom";

import css from "./MoviesListCard.module.css";
import {tmDbService} from "../../services";
import {useAppSelector} from "../../hooks";
import {IMovie} from "../../interfaces";
import {GenreBadge, PosterPreview, StarsRating} from "..";

interface IProps {
    movie: IMovie,
    onResize: (node: Node, width: number, height: number) => void
}

const MoviesListCard: FC<IProps> = ({movie, onResize}) => {
    const {genres} = useAppSelector(state => state.genresReducer);
    const navigate = useNavigate();
    const selfRef = useRef<HTMLDivElement>(null);
    const prevSize = useRef({w: 0, h: 0});

    let overview = movie.overview;
    const isLongOverview = overview.length > 128;
    if (isLongOverview) {
        overview = overview.substring(0, overview.lastIndexOf(' ', 128)) + ' ';
    }

    const posterSrc = movie.backdrop_path || movie.poster_path;

    useEffect(() => {
        const handleResize: ResizeObserverCallback = (entries) => {
            const entry = entries[0];
            // if (prevSize.current.h !== entry.contentRect.height || prevSize.current.h !== entry.contentRect.height) {
                prevSize.current.h = entry.contentRect.height;
                prevSize.current.w = entry.contentRect.width;

                onResize(entry.target,
                    Math.round(entry.contentRect.width),
                    Math.round(entry.contentRect.height));
            // }
        }

        const ulObserver = new ResizeObserver(handleResize);
        ulObserver.observe(selfRef.current as Element);

        return () => ulObserver.disconnect();
    })

    return (
        <div
            className={css.MoviesListCard}
            onClick={() => navigate(movie.id.toString())}
            ref={selfRef}
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
