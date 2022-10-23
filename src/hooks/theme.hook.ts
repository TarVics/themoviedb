import {useContext} from "react";

import {IThemeContext, ThemeContext} from "../hoc";

export const useThemeContext = () => useContext<IThemeContext>(ThemeContext);
