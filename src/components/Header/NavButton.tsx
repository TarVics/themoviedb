import React, {FC, MouseEventHandler} from 'react';

import css from "./Header.module.css";

interface IProps {
    disabled?: boolean,
    icon: string,
    onClick?: MouseEventHandler<HTMLSpanElement>,
    title: string,
}

const NavButton: FC<IProps> = ({icon, onClick, title, disabled}) => {
    return (
        <span
            onClick={onClick}
            title={title}
            className={css.icon + (disabled ? " " + css.disabled : "") + " fa fa-lg " + icon}>
        </span>
    )
};

export {NavButton}