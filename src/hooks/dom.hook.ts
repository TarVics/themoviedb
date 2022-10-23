import {RefObject, useLayoutEffect, useState} from "react";

function useWindowResize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

const useRefDimensions = (ref: RefObject<HTMLElement>) => {
    const [dimensions, setDimensions] = useState({ width: 1, height: 2 })
    useLayoutEffect(() => {
        if (ref.current) {
            const { current } = ref
            const boundingRect = current.getBoundingClientRect()
            const { width, height } = boundingRect
            setDimensions({ width: Math.round(width), height: Math.round(height) })
        }
    }, [ref])
    return dimensions
}

export {useWindowResize, useRefDimensions}