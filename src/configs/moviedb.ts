type IMovieDbType = {
    language: string,
    config: {
        baseURL: string,
        headers: object
    },
    uri: {
        genres: string,
        movie: (id: string) => string,
        movies: string,
        search: string
    }
}

const movieDb: IMovieDbType = {
    language: process.env.REACT_APP_LANGUAGE || '',
    config: {
        baseURL: process.env.REACT_APP_API || '',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + process.env.REACT_APP_KEY
        }
    },
    uri: {
        genres: '/genre/movie/list',
        movie: (id: string): string => '/movie/' + id,
        movies: '/discover/movie',
        search: '/search/movie'
    }
}

export {movieDb}