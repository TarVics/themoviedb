import React, {FC} from 'react';

import css from "./Header.module.css";
import ukraine from "./ukraine.png";
import usa from "./united-states.png";

import {themes} from "../../hoc";
import {useThemeContext} from "../../hooks";
import {NavButton} from ".";

const NavTheme: FC = () => {
    const {theme, toggleTheme, language, toggleLanguage} = useThemeContext();
    return (
        <>
            <img
                title={language.name}
                className={css.icon}
                onClick={() => toggleLanguage()}
                src={language.name === 'Ukrainian' ? ukraine : usa}
                key={language.name}
                alt={language.name}/>
            <NavButton
                onClick={() => toggleTheme()}
                title={'Theme switch'}
                icon={theme === themes.dark ? 'fa-moon-o' : 'fa-sun-o'}
            />
        </>
    )
}

export {NavTheme}