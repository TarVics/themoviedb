import React, {FC, useState} from 'react';
import {Outlet, URLSearchParamsInit, useNavigate, useParams, useSearchParams} from "react-router-dom";

import {useAppSelector} from "../../hooks";
import {
    Header,
    ISearchFormResult,
    NavButton,
    NavLanguage,
    NavPage,
    NavSearch,
    NavTheme,
    SearchForm
} from "../../components";

const MainLayout: FC = () => {
    const {i18n} = useAppSelector(state => state.i18nReducer);
    const params = useParams();
    const navigate = useNavigate();
    const [searchVisible, setSearchVisible] = useState(false);
    const [query, setQuery] = useSearchParams({page: '1'});
    const {prev, next, loading} = useAppSelector(state => state.moviesReducer);

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
                <NavLanguage/>
                <NavTheme/>
                {!params.id &&
                    <>
                        <NavSearch
                            active={searchVisible}
                            onClick={() => setSearchVisible(visible => !visible)}/>
                        <NavPage
                            prevPage={prev ? prevPage : null}
                            nextPage={next ? nextPage : null}
                            loading={loading}
                            />
                    </>
                }
                {params.id &&
                    <NavButton
                        onClick={() => navigate(-1)}
                        title={i18n.value.BACKWARD}
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