import {createContext, FC, ReactNode, useCallback, useEffect, useState} from "react";

const themes = {
    dark: 'dark',
    light: 'light'
}

export interface IThemeContext {
    theme: string,
    setTheme: (theme: string) => void,
    toggleTheme: () => void
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

const getTheme = () => {
    const theme = `${window?.localStorage?.getItem('theme')}`
    if (Object.values(themes).includes(theme)) return theme;

    const userMedia = window.matchMedia('(prefers-color-scheme: light)')
    if (userMedia.matches) return themes.light;

    return themes.dark
}

interface IProps {
    children?: ReactNode
}

const ThemeProvider: FC<IProps> = ({children}) => {
    const [theme, setTheme] = useState(getTheme());

    const toggleTheme = useCallback(() => {
        setTheme(theme === themes.light ? themes.dark : themes.light);
    }, [theme]);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('theme', theme)
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, setTheme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export {
    themes,
    ThemeContext,
    ThemeProvider
}
