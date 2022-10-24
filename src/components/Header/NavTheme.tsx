import React, {FC} from 'react';

import {themes} from "../../hoc";
import {useAppSelector, useThemeContext} from "../../hooks";
import {NavButton} from ".";

const NavTheme: FC = () => {
    const {theme, toggleTheme} = useThemeContext();
    const {i18n} = useAppSelector(state => state.i18nReducer);

    return (
        <NavButton
            onClick={() => toggleTheme()}
            title={i18n.value.THEME}
            icon={theme === themes.dark ? 'fa-moon-o' : 'fa-sun-o'}
        />
    )
}

export {NavTheme}