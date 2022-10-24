import React, {FC, MouseEventHandler} from 'react';

import {NavButton} from ".";
import {useAppSelector} from "../../hooks";

interface IProps {
    active: boolean,
    onClick: MouseEventHandler<HTMLSpanElement>
}

const NavSearch: FC<IProps> = ({onClick, active}) => {
    const {i18n} = useAppSelector(state => state.i18nReducer);
    return (
        <NavButton
            onClick={onClick}
            title={i18n.value.SEARCH}
            icon={active ? 'fa-close' : 'fa-search'}
        />
    )
}

export {NavSearch}