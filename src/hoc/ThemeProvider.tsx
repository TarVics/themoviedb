import {createContext, FC, ReactNode, useCallback, useEffect, useState} from "react";

const themes = {
    dark: 'dark',
    light: 'light'
}

export type ILanguage = {
    name: string,
    encode: string
}

const languages: ILanguage[] = [
    {
        name: 'Ukrainian',
        encode: 'uk-UA'
    },
    {
        name: 'English',
        encode: 'en-US'
    }
];

export interface IThemeContext {
    language: ILanguage;
    theme: string,
    setLanguage: (language: ILanguage) => void,
    setTheme: (theme: string) => void,
    toggleLanguage: () => void
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

const getLanguage = () => {
    const language = `${window?.localStorage?.getItem('language')}`
    const langItem = languages.find(value => value.name === language);
    return langItem ? langItem : languages[0];
}

interface IProps {
    children?: ReactNode
}

const ThemeProvider: FC<IProps> = ({children}) => {
    const [theme, setTheme] = useState(getTheme());
    const [language, setLanguage] = useState(getLanguage());

    const toggleLanguage = useCallback(() => {
        setLanguage(language.name === languages[0].name ? languages[1] : languages[0]);
    }, [language]);

    const toggleTheme = useCallback(() => {
        setTheme(theme === themes.light ? themes.dark : themes.light);
    }, [theme]);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('theme', theme)
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('language', language.name)
    }, [language.name]);

    return (
        <ThemeContext.Provider value={{language, setLanguage, toggleLanguage, theme, setTheme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export {
    themes,
    ThemeContext,
    ThemeProvider
}
