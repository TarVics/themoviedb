import {AsyncAxiosResponse, axiosService} from './axios.service';

import {movieDb} from "../configs";
import {IGenres, IMovieDetails, IMovies} from "../interfaces";

export interface IMovieSearchProps {
    genres?: string | null,
    language?: string | null,
    query?: string | null,
    page?: string | null
}

const movieDbService = {

    getGenres: (lang = movieDb.language): AsyncAxiosResponse<IGenres> =>
        axiosService.get(movieDb.uri.genres + '?language=' + lang),

    getMovies: (props: IMovieSearchProps): AsyncAxiosResponse<IMovies> => {
        let isSearch = props.query;
        const uri = isSearch ? movieDb.uri.search : movieDb.uri.movies;

        const searchParams = new URLSearchParams();

        searchParams.set('language', props.language ? props.language : movieDb.language);
        props.page && searchParams.set('page', props.page);
        props.query && searchParams.set('query', props.query);

        if (props.genres) {
            const arrayGenres = props.genres.split(',');
            if (!isSearch && arrayGenres.length > 0) {
                searchParams.set('with_genres', arrayGenres.join(','));
            }
        }

        const uriParams = searchParams.toString();
        // console.log(uri + '?' + uriParams);

        return axiosService.get(uri + '?' + uriParams);
    },

    getMovieById: (id: string, lang = movieDb.language): AsyncAxiosResponse<IMovieDetails> =>
        axiosService.get(movieDb.uri.movie(id) + '?language=' + lang),
}

export { movieDbService }