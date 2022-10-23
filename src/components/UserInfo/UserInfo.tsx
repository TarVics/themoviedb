import React from 'react';

import css from "./UserInfo.module.css";
import avatar from './avatar.jpg';

const UserInfo = () => {
    return (
        <div className={css.UserInfo}>
            <span className={css.name}>Victor Taran</span>
            <img className={css.image} src={avatar} alt="avatar" />
        </div>
    );
};

export {UserInfo}