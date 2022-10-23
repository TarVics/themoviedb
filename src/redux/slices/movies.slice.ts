import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IMovieSearchProps, movieDbService} from "../../services";
import {IMovie, IMovieDetails, IMovies} from "../../interfaces";

interface IMoviesState {
    movies: IMovie[],
    prev: number | null,
    next: number | null,
    current: IMovie | null,
    loading: boolean,
    error: string | null
}

const initialState: IMoviesState = {
    movies: [],
    prev: null,
    next: null,
    current: null,
    loading: false,
    error: null
}

const getMovies = createAsyncThunk<IMovies, IMovieSearchProps>(
    'moviesSlice/getMovies',
    async (props: IMovieSearchProps, {rejectWithValue}) => {
        try {
            const { data } = await movieDbService.getMovies(props);
            return data;
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response?.data || error.toString())
        }
    }
);

const getMovieById = createAsyncThunk<IMovieDetails, {id: string, language?: string}>(
    'moviesSlice/getMovieById',
    async ({id, language}, {rejectWithValue}) => {
        try {
            const { data } = await movieDbService.getMovieById(id, language);
            if (!data.overview) {
                const { data: dataEn } = await movieDbService.getMovieById(id, 'en-US');
                data.title = dataEn.title;
                data.overview = dataEn.overview;
                data.original_title = dataEn.original_title;
                data.original_language = dataEn.original_language;
            }
            return data;
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response?.data || error.toString())
        }
    }
);

const moviesSlice = createSlice({
    name: 'moviesSlice',
    initialState,
    reducers: {
        setCurrent: (state, action) => {
            state.current = action.payload;
        },
    },
    extraReducers: builder =>
        builder
            .addCase(getMovies.fulfilled, (state, action) => {
                const pageData = action.payload;
                state.movies = pageData.results;
                state.prev = pageData.page === 1 ? null : (pageData.page - 1);
                state.next = ((pageData.page < 500) && (pageData.page < pageData.total_pages)) ? (pageData.page + 1) : null;
                state.loading = false;
            })

            .addCase(getMovieById.fulfilled, (state, action) => {
                state.current = action.payload;
                state.loading = false;
            })

            .addDefaultCase((state, action) => {
                const [pathElement] = action.type.split('/').splice(-1);
                // console.log(action.type);
                // moviesSlice/getMovieById/rejected
                // console.log(pathElement);
                if (pathElement === 'rejected') {
                    state.error = action.payload;
                    state.loading = false;
                } else if (pathElement === 'pending'){
                    state.error = null;
                    state.loading = true;
                }
            })
});


const {reducer: moviesReducer, actions: {setCurrent}} = moviesSlice;

const moviesActions = {
    setCurrent,
    getMovies,
    getMovieById
}

export {moviesReducer, moviesActions}