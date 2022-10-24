import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {moviesReducer, genresReducer, i18nReducer} from "./slices";

const rootReducer = combineReducers({
    moviesReducer,
    genresReducer,
    i18nReducer
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
