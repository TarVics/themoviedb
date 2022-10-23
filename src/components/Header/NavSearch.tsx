import React, {FC, MouseEventHandler} from 'react';

import {NavButton} from ".";

interface IProps {
    active: boolean,
    onClick: MouseEventHandler<HTMLSpanElement>
}

const NavSearch: FC<IProps> = ({onClick, active}) => {
    return (
        <NavButton
            onClick={onClick}
            title={'Search'}
            icon={active ? 'fa-close' : 'fa-search'}
        />
    )
}

export {NavSearch}