import React, {FC} from 'react';

import css from "./Header.module.css";
import ukraine from "./ukraine.png";
import usa from "./united-states.png";

import {i18nActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

const NavLanguage: FC = () => {
    const dispatch = useAppDispatch();
    const {i18n} = useAppSelector(state => state.i18nReducer);

    return (
        <img
            title={i18n.caption}
            className={css.icon}
            onClick={() => dispatch(i18nActions.toggleLanguage())}
            src={i18n.name === "ukrainian" ? ukraine : usa}
            key={i18n.name}
            alt={i18n.caption}/>
    )
}

export {NavLanguage}