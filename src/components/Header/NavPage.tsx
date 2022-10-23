import React, {FC, useEffect, useRef, useState} from 'react';

import {NavButton, NavSpinner} from ".";

interface IInitState {
    button: number | null,
    waitButton: number | null,
}

interface IProps {
    prevPage: (() => void) | null,
    nextPage: (() => void) | null,
    loading: boolean
}

const initState: IInitState = {
    button: null,
    waitButton: null
}

const NavPage: FC<IProps> = ({prevPage, nextPage, loading}) => {
    const [waitData, setWaitData] = useState<IInitState>(initState);
    const waitTimer = useRef<null | ReturnType<typeof setTimeout>>(null);

    useEffect(() => {
        if (waitTimer.current) {
            clearTimeout(waitTimer.current);
            waitTimer.current = null;
        }
        if (!loading) {
            setWaitData(initState);
        } else {
            waitTimer.current = setTimeout(() => {
                setWaitData(data => ({...initState, button: data.waitButton}));
            }, 200);
        }
    }, [loading]);

    const clickPrev = () => {
        setWaitData({...initState, waitButton: 0});
        prevPage && prevPage();
    }

    const clickNext = () => {
        setWaitData({...initState, waitButton: 1});
        nextPage && nextPage();
    }

    return (
        <>
            {(waitData.button === 0) && <NavSpinner/>}
            {(waitData.button !== 0) &&
                <NavButton
                    onClick={() => prevPage && clickPrev()}
                    title={prevPage ? 'Backward' : ''}
                    disabled={!prevPage}
                    icon={'fa-chevron-left'}
                />
            }

            {(waitData.button === 1) && <NavSpinner/>}
            {(waitData.button !== 1) &&
                <NavButton
                    onClick={() => nextPage && clickNext()}
                    title={nextPage ? 'Forward' : ''}
                    disabled={!nextPage}
                    icon={'fa-chevron-right'}
                />
            }
        </>
    );
};

export {NavPage}