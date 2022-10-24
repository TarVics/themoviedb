import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type I18nLanguage = "ukrainian" | "english";
type I18nEncode = "uk-UA" | "en-US";
type I18nKey = "AUTHOR" | "BACKWARD" | "BUDGET" | "COMPANIES" | "COUNTRIES" | "FORWARD" | "GENRES" |
    "ID" | "LANGUAGES" | "PAGE_NOT_FOUND" | "SEARCH" | "SEARCH_PLACEHOLDER" | "THEME";

type I18nText = Record<I18nKey, string>;

type I18n = {
    caption: string,
    encode: I18nEncode,
    name: I18nLanguage,
    value: I18nText
}

type I18nData = Record<I18nLanguage, I18n>;

const i18nData: I18nData = {
    "ukrainian": {
        caption: "Українська",
        encode: "uk-UA",
        name: "ukrainian",
        value: {
            "AUTHOR": "Віктор Таран",
            "BACKWARD": "Назад",
            "BUDGET": 'Бюджет',
            "COMPANIES": 'Компанії',
            "COUNTRIES": 'Країни',
            "FORWARD": "Вперед",
            "GENRES": "Жанри",
            "ID": 'id',
            "LANGUAGES": 'Мови',
            "PAGE_NOT_FOUND": "Сторінку не знайдено",
            "SEARCH": "Пошук",
            "SEARCH_PLACEHOLDER": "Введіть текст для пошуку...",
            "THEME": 'Перемикання теми'
        }
    },
    "english": {
        caption: "English",
        encode: "en-US",
        name: "english",
        value: {
            "AUTHOR": "Victor Taran",
            "BACKWARD": "Backward",
            "BUDGET": 'Budget',
            "COMPANIES": 'Companies',
            "COUNTRIES": 'Countries',
            "FORWARD": "Forward",
            "GENRES": "Жанри",
            "ID": 'id',
            "LANGUAGES": 'Languages',
            "PAGE_NOT_FOUND": "Page not found",
            "SEARCH": "Search",
            "SEARCH_PLACEHOLDER": "Enter text for search...",
            "THEME": 'Theme switch'
        }
    }
}

/*


"ID": 'id'
"BUDGET": 'Budget',
"LANGUAGES": 'Languages',
"COUNTRIES": 'Countries',
"COMPANIES": 'Companies'

*/



interface I18nState {
    i18n: I18n
}

const initialFunc = () => {
    const language = `${window?.localStorage?.getItem('language')}`;
    if (Object.keys(i18nData).includes(language)) {
        return i18nData[language as I18nLanguage];
    } else {
        const result = i18nData["ukrainian"];
        localStorage.setItem('language', result.name);
        return result;
    }
}

const initialState: I18nState = {
    i18n: initialFunc() as I18n
}

const i18nSlice = createSlice({
    name: 'i18nSlice',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<I18nLanguage>) => {
            state.i18n = i18nData[action.payload];
            localStorage.setItem('language', state.i18n.name);
        },
        toggleLanguage: (state) => {
            state.i18n = i18nData[state.i18n.name === "ukrainian" ? "english" : "ukrainian"];
            localStorage.setItem('language', state.i18n.name);
        },
    },
});

const {reducer: i18nReducer, actions: {setLanguage, toggleLanguage}} = i18nSlice;

const i18nActions = {
    setLanguage,
    toggleLanguage
}

export {i18nReducer, i18nActions}