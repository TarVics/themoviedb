import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {movieDbService} from "../../services";
import {IGenre} from "../../interfaces";

type GenresState = Record<number, IGenre>;
// type GenresStateKey = keyof GenresState;
// type GenresStateKeyNumber = keyof {
//     [K in keyof GenresState as number extends GenresState[K] ? K : never]: K
// }

interface IGenresState {
    genres: GenresState,
    current: IGenre | null,
    loading: boolean,
    error: string | null
}

const initialState: IGenresState = {
    genres: {},
    current: null,
    loading: false,
    error: null,
}

const getGenres = createAsyncThunk<IGenre[], string | undefined>(
    'genresSlice/getGenres',
    async (language, {rejectWithValue}) => {
        try {
            const { data: {genres: data} } = await movieDbService.getGenres(language);
            return data;
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response?.data || error.toString())
        }
    }
);

const genresSlice = createSlice({
    name: 'genresSlice',
    initialState,
    reducers: {
        setCurrent: (state, action) => {
            state.current = action.payload;
        },
    },
    extraReducers: builder =>
        builder
            .addCase(getGenres.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(getGenres.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(getGenres.fulfilled, (state, action) => {
                state.genres = action.payload.reduce((acc: GenresState, val) =>
                    (acc[val.id] = val) && acc, {});
                state.loading = false;
            })
});

const {reducer: genresReducer, actions: {setCurrent}} = genresSlice;

const genresActions = {
    setCurrent,
    getGenres
}

export {genresReducer, genresActions}