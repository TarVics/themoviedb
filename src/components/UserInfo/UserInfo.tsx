import React from 'react';

import css from "./UserInfo.module.css";
import avatar from './avatar.jpg';
import {useAppSelector} from "../../hooks";

const UserInfo = () => {
    const {i18n} = useAppSelector(state => state.i18nReducer);
    return (
        <div className={css.UserInfo}>
            <span className={css.name}>{i18n.value.AUTHOR}</span>
            <img className={css.image} src={avatar} alt="avatar" />
        </div>
    );
};

export {UserInfo}