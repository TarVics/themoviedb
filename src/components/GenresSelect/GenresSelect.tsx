import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {UseFormReturn} from "react-hook-form/dist/types";

import css from "./GenresSelect.module.css";
import {useAppSelector} from "../../hooks";
import {ISearchFormData, NavButton} from "..";

interface IProps {
    disabled: boolean
    form: UseFormReturn<ISearchFormData>,
}

const GenresSelect: FC<IProps> = ({form, disabled}) => {
    const {register} = form;
    const {genres: allGenres} = useAppSelector(state => state.genresReducer);
    const [active, setActive] = useState(false);
    const genresControl = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const control = genresControl.current;
        const onClickControl: EventListener = (e) => e.stopPropagation();
        const onClickGlobal = () => setActive(false);

        control && control.addEventListener('click', onClickControl);
        document.body.addEventListener('click', onClickGlobal);

        return () => {
            control && control.removeEventListener('click', onClickControl);
            document.body.removeEventListener('click', onClickGlobal);
        }
    }, [active]);

    useEffect(() => {
        setActive(false);
    }, [disabled]);

    const onClickGenres = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
        !disabled && setActive(value => !value);
        e.stopPropagation();
    }, [disabled]);

    return (
        <div className={css.GenresSelect}>
            <NavButton
                disabled={disabled}
                onClick={onClickGenres}
                title={'Жанри'}
                icon={active ? 'fa-close' : 'fa-list'}
            />
            <div
                style={{
                    visibility: active ? 'visible' : 'hidden',
                    opacity: active ? '1' : '0'
                }}
                ref={genresControl}
                className={css.items}
            >
                {Object.values(allGenres).sort(
                    (a, b) => a.name.localeCompare(b.name)).map(genre =>
                    <div key={genre.id}>
                        <input
                            id={genre.id.toString()}
                            {...register('genres')}
                            type="checkbox"
                            value={genre.id}/>
                        <label htmlFor={genre.id.toString()}>{genre.name}</label>
                    </div>
                )}

            </div>
        </div>
    );
};

export {GenresSelect}