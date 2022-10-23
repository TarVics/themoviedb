import {IGenre} from "./Genre.interface";
import {IMovie} from "./Movie.interface";

export interface IMovieLanguage {
    english_name: string,
    iso_639_1: string,
    name: string,
}

export interface IMovieCountry {
    iso_3166_1: string,
    name: string
}

export interface IMovieCompany {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
}

export interface IMovieCollection {
    id: number,
    name: string,
    poster_path: string,
    backdrop_path: string
}

export interface IMovieDetails extends IMovie {
    // adult: boolean,
    // backdrop_path: string,
    belongs_to_collection: IMovieCollection,
    budget: number,
    genres: IGenre[],
    homepage: string,
    // id: number,
    imdb_id: string,
    // original_language: string,
    // original_title: string,
    // overview: string,
    // popularity: number,
    // poster_path: string,
    production_companies: IMovieCompany[],
    production_countries: IMovieCountry[],
    // release_date: string,
    revenue: number,
    runtime: number,
    spoken_languages: IMovieLanguage[],
    status: string,
    tagline: string,
    // title: string,
    // video: boolean,
    // vote_average: number,
    // vote_count: number
}

