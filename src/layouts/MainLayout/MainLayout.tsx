import React, {FC, useEffect, useState} from 'react';
import {Outlet, URLSearchParamsInit, useNavigate, useParams, useSearchParams} from "react-router-dom";

import {genresActions, moviesActions} from "../../redux";
import {Header, ISearchFormResult, NavButton, NavPage, NavSearch, NavTheme, SearchForm} from "../../components";
import {useAppDispatch, useAppSelector, useThemeContext} from "../../hooks";

const MainLayout: FC = () => {
    const {language} = useThemeContext();
    const dispatch = useAppDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const [searchVisible, setSearchVisible] = useState(false);
    const [query, setQuery] = useSearchParams({page: '1'});
    const {prev, next, loading} = useAppSelector(state => state.moviesReducer);

    useEffect(() => {
        dispatch(genresActions.getGenres(language.encode));
    }, [dispatch, language]);

    useEffect(() => {
        dispatch(moviesActions.getMovies({
            page: query.get('page'),
            genres: query.get('genres'),
            query: query.get('query'),
            language: language.encode
        }));
    }, [query, language, dispatch]);

    const prevPage = () => {
        setQuery(value => {
            value.set('page', String(Number(value.get('page')) - 1));
            return value;
        })
    }

    const nextPage = () => {
        setQuery(value => {
            value.set('page', String(Number(value.get('page')) + 1));
            return value;
        })
    }

    const onSubmit = (form: ISearchFormResult) => {
        setQuery(() => {
            return (form.query ?
                {query: form.query} :
                form.genres ?
                    {genres: form.genres} : {}
            ) as URLSearchParamsInit;
        });
    }

    return (
        <>
            <Header>
                <NavTheme/>
                {!params.id &&
                    <NavSearch
                        active={searchVisible}
                        onClick={() => setSearchVisible(visible => !visible)}/>
                }
                {!params.id &&
                    <NavPage
                        prevPage={prev ? prevPage : null}
                        nextPage={next ? nextPage : null}
                        loading={loading}
                    />
                }
                {params.id &&
                    <NavButton
                        onClick={() => navigate(-1)}
                        title={'Назад'}
                        icon={'fa-chevron-left'}
                    />
                }
            </Header>
            {!params.id &&
                <SearchForm
                    visible={searchVisible}
                    query={query}
                    onSubmit={onSubmit}
                />
            }
            <Outlet/>
        </>
    );
}

export {MainLayout}