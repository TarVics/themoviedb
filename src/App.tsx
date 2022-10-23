import React, {FC} from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import {MainLayout} from "./layouts";
import {MovieInfoPage, MoviesListPage, NoPage} from "./pages";

const App: FC = () => {

    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route index element={<Navigate to={'movies'}/>}/>
                <Route path={'movies'} element={<MoviesListPage/>}/>
                <Route path={'movies/:id'} element={<MovieInfoPage/>} />
                <Route path={'*'} element={<NoPage/>}/>
            </Route>
        </Routes>
    )
}

export {App}
