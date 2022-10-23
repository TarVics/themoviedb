import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {moviesReducer, genresReducer} from "./slices";

const rootReducer = combineReducers({
    moviesReducer,
    genresReducer,
});

const setupStore = () => configureStore({
    reducer: rootReducer
});

type RootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setupStore>
type AppDispatch = AppStore['dispatch']

export type {
    RootState,
    AppStore,
    AppDispatch
}

export {
    setupStore
}
