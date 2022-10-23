import React, {FC, ReactNode} from 'react';

import css from "./Header.module.css";
import {UserInfo} from "..";

interface IProps {
    children?: ReactNode
}

const Header: FC<IProps> = ({children}) => {

    return (
        <nav className={css.Header}>
            <div className={css.wrapper}>
                <div className={css.container}>
                    {children}
                </div>
                <UserInfo/>
            </div>
        </nav>
    );
};

export {Header}