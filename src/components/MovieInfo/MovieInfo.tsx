import React, {FC} from 'react';

import css from "./MovieInfo.module.css";
import {tmDbService} from "../../services";
import {IMovieDetails} from "../../interfaces";
import {useAppSelector, useWindowResize} from "../../hooks";
import {GenreBadge,StarsRating,MovieInfoRow} from "..";

interface IProps {
    movie: IMovieDetails
}

const MovieInfo: FC<IProps> = ({movie}) => {
    const {i18n} = useAppSelector(state => state.i18nReducer);
    const [width] = useWindowResize();
    const backgroundSrc = movie.backdrop_path || movie.belongs_to_collection?.backdrop_path;
    const foregroundSrc = movie.poster_path || movie.belongs_to_collection?.poster_path;

    return (
        <div className={css.MovieInfo}>
            <div className={css.before}
                 {...(backgroundSrc && {
                     style: {
                         backgroundImage: 'url("' + tmDbService.getPoster(backgroundSrc, 1280) + '")'
                     }
                 })}
            />
            <div className={css.content}>
                <div className={css.left}>
                    {foregroundSrc &&
                        <img className={css.image}
                             src={tmDbService.getPoster(foregroundSrc,width < 600 ? 300 : 500)}
                             alt={movie.title}/>
                    }
                </div>
                <div className={css.right}>
                    <div className={css.page}>
                        <div className={css.paragraph}>
                            {movie.imdb_id && <MovieInfoRow caption={i18n.value.ID} text={movie.imdb_id}/>}
                            {movie.status && <MovieInfoRow caption={movie.status} />}
                        </div>

                        <div className={css.paragraph}>
                            <h3>{movie.title + (movie.release_date ? ' (' + movie.release_date.substring(0, 4) + ')' : '')}</h3>
                            {movie.original_title &&
                                <h5>{movie.original_title + (movie.original_language ? ' (' + movie.original_language + ')' : '')}</h5>}
                        </div>

                        <div className={css.paragraph}>
                            {movie.genres && movie.genres.map(genre =>
                                <GenreBadge key={genre.id} text={genre.name}/>)
                            }
                            <div><StarsRating value={movie.vote_average} text={movie.vote_count.toString()}/></div>
                        </div>

                        <div className={css.paragraph}>
                            {movie.budget > 0 && <MovieInfoRow caption={i18n.value.BUDGET} text={movie.budget.toString()}/>}

                            {movie.spoken_languages &&
                                <MovieInfoRow
                                    caption={i18n.value.LANGUAGES}
                                    text={movie.spoken_languages.map(v => v.name).join(', ')}
                                />
                            }

                            {movie.production_countries.length > 0 &&
                                <MovieInfoRow
                                    caption={i18n.value.COUNTRIES}
                                    text={movie.production_countries.map(v => v.name).join(', ')}
                                />
                            }

                            {movie.production_companies.length > 0 &&
                                <MovieInfoRow
                                    caption={i18n.value.COMPANIES}
                                    text={
                                        movie.production_companies.map(v =>
                                            v.name + (v.origin_country ? ' (' + v.origin_country + ')' : '')
                                        ).join(', ')
                                    }
                                />

                            }
                        </div>
                        {movie.overview && <div className={css.overview}>{movie.overview}</div>}
                </div>
                </div>
            </div>
        </div>
    );
};


export {MovieInfo}