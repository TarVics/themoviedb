import React, {FC, useEffect, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

import css from "./SearchForm.module.css";
import {NavButton, GenresSelect} from "..";

export interface ISearchFormResult {
    genres: string,
    query: string
}

export interface ISearchFormData {
    genres: string[],
    query: string
}

interface IProps {
    onSubmit: (form: ISearchFormResult) => void,
    visible: boolean,
    query: URLSearchParams
}

const SearchForm: FC<IProps> = ({onSubmit, visible, query}) => {
    const form = useForm<ISearchFormData>({mode: 'all'});
    const {register, handleSubmit, setFocus, setValue} = form;
    const [genresActive, setGenresActive] = useState(true);

    useEffect(() => {
        const queryString = query.get('query') || '';
        setValue('query', queryString);

        const genres = query.get('genres') || '';
        const genreIds = genres.split(',');
        setValue('genres', genreIds);

        setGenresActive(queryString === '');
    }, [query, setValue]);

    useEffect(() => {
        visible && setFocus("query");
    }, [visible, setFocus]);

    const onSubmitForm: SubmitHandler<ISearchFormData> = form => {
        const genres = form.genres.join();
        onSubmit && onSubmit({...form, genres});
    }

    return (
        <form
            className={
                css.SearchForm + ' ' +
                (visible ? css.visible : css.hidden)
            }
            onSubmit={handleSubmit(onSubmitForm)}>

            <GenresSelect form={form} disabled={!genresActive} />

            <input
                type="text"
                placeholder={"Enter text for search..."}
                {...register("query", {
                    onChange: e => setGenresActive(!e.target.value)
                })}
            />

            <button>
                <NavButton title={'Search'} icon={'fa-check'} />
            </button>
        </form>
    );
};

export {SearchForm}