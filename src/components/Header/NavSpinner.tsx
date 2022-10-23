import React, {FC} from 'react';

import css from "./Header.module.css";

interface IProps {
    className?: string
}

const NavSpinner: FC<IProps> = ({className}) => {
    return (
        <div
            style={{WebkitAnimation: '.75s linear infinite spinner-border'}}
            className={css.spinner + ((className && css[className]) ? ' ' + css[className] : '')} />
    );
};

export {NavSpinner}