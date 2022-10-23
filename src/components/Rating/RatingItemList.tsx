import React, {CSSProperties, FC, ReactNode, useEffect, useState} from 'react';

import {IRatingIconType, IRatingEventHandler, RatingItem} from ".";

interface IProps {
    totalSymbols: number,
    value: number, // Always >= 0
    placeholderValue: number,
    readonly?: boolean,
    quiet?: boolean,
    fractions?: number,
    direction?: CanvasDirection,
    emptySymbol: IRatingIconType | IRatingIconType[],
    fullSymbol: IRatingIconType | IRatingIconType[],
    placeholderSymbol?: IRatingIconType | IRatingIconType[],
    onClick: IRatingEventHandler,
    onHover: (value: number) => void,
    className?: string,
    id?: string,
    style?: CSSProperties,
    tabIndex?: number,
    "aria-label"?: string
}

type IRatingListStateValue = {
    // Indicates the value that is displayed to the user in the form of symbols.
    // It can be either 0 (for no displayed symbols) or (0, end]
    displayValue: number,
    // Indicates if the user is currently hovering over the rating element
    interacting: boolean
}

type IRatingItemListState = {
    current: IRatingListStateValue,
    previous?: IRatingListStateValue
}

const RatingItemList: FC<IProps> = (props) => {
    const [state, setState] = useState<IRatingItemListState>(() =>
        ({
            current: {
                // Indicates the value that is displayed to the user in the form of symbols.
                // It can be either 0 (for no displayed symbols) or (0, end]
                displayValue: props.value,
                // Indicates if the user is currently hovering over the rating element
                interacting: false
            }
        })
    );

    useEffect(() => {
        setState(prev => ({
            previous: prev.current,
            current: {displayValue: props.value, interacting: false}
        }));
    }, [props.value]);

    // NOTE: This callback is a little fragile. Needs some "care" because
    // it relies on brittle state kept with different props and state
    // combinations to try to figure out from where we are coming, I mean, what
    // caused this update.

    useEffect(() => {

        // When hover ends, call this.props.onHover with no value.
        if (state.previous?.interacting && !state.current.interacting) {
          return props.onHover(0);
        }

        // When hover over.
        // Hover in should only be emitted while we are hovering (interacting),
        // unless we changed the value, usually originated by an onClick event.
        // We do not want to emit a hover in event again on the clicked
        // symbol.
        if (state.current.interacting && state.previous?.displayValue === props.value) {
            props.onHover(state.current.displayValue);
        }

    }, [state, props]);

    const calculateHoverPercentage = (event: React.SyntheticEvent) => {
        const clientX = event.nativeEvent.type.indexOf("touch") > -1
            ? event.nativeEvent.type.indexOf("touchend") > -1 ?
                (event as React.TouchEvent<HTMLElement>).changedTouches[0].clientX :
                (event as React.TouchEvent<HTMLElement>).touches[0].clientX
            : (event as React.MouseEvent<HTMLElement>).clientX;

        const targetRect = (event.target as HTMLElement).getBoundingClientRect();
        const delta = props.direction === 'rtl'
            ? targetRect.right - clientX
            : clientX - targetRect.left;

        // Returning 0 if the delta is negative solves the flickering issue
        return delta < 0 ? 0 : delta / targetRect.width;
    }

    const calculateDisplayValue = (symbolIndex: number, event: React.SyntheticEvent) => {
        const percentage = calculateHoverPercentage(event);
        // Get the closest top fraction.
        const fraction = Math.ceil(percentage % 1 * (props.fractions || 1)) / (props.fractions || 1);
        // Truncate decimal trying to avoid float precision issues.
        const precision = 10 ** 3;
        const displayValue =
            symbolIndex + (Math.floor(percentage) + Math.floor(fraction * precision) / precision);
        // ensure the returned value is greater than 0 and lower than totalSymbols
        return displayValue > 0 ? displayValue > props.totalSymbols ? props.totalSymbols : displayValue : 1 / (props.fractions || 1);
    }

    const symbolClick: IRatingEventHandler = (symbolIndex: number, event: React.SyntheticEvent) => {
        const value: number = calculateDisplayValue(symbolIndex, event);
        props.onClick(value, event);
    }

    const symbolMouseMove = (symbolIndex: number, event: React.SyntheticEvent) => {
        const value = calculateDisplayValue(symbolIndex, event);
        // This call should cause an update only if the state changes.
        // Mainly the first time the mouse enters and whenever the value changes.
        // So DidComponentUpdate is NOT called for every mouse movement.
        setState(prev => ({
          previous: prev.current,
          current: {displayValue: value, interacting: !props.readonly}
        }));
    }

    const onMouseLeave = () => {
        setState(prev => ({
            previous: prev.current,
            current: {displayValue: props.value, interacting: false}
        }));
    }

    const symbolEnd = (symbolIndex: number, event: React.SyntheticEvent) => {
        // Do not raise the click event on quiet mode when a touch end is received.
        // On quiet mode the touch end event only notifies that we have left the
        // symbol. We wait for the actual click event to call the symbolClick.
        // On not quiet mode we simulate the click event on touch end, and we just
        // prevent the real on click event to be raised.
        // NOTE: I know how we manage click events on touch devices is a little
        // weird because we do not notify the starting value that was clicked but
        // the last (touched) value.
        if (!props.quiet) {
            symbolClick(symbolIndex, event);
            event.preventDefault();
        }
        // On touch end we are "leaving" the symbol.
        onMouseLeave();
    }

    const {
        readonly,
        quiet,
        totalSymbols,
        value,
        placeholderValue,
        direction,
        emptySymbol,
        fullSymbol,
        placeholderSymbol,
        className,
        id,
        style,
        tabIndex
    } = props;

    const {displayValue, interacting} = state.current;
    const symbolNodes: ReactNode[] = [];
    const empty = [].concat(emptySymbol as any);
    const full = [].concat(fullSymbol as any);
    const placeholder = [].concat(placeholderSymbol as any);
    const shouldDisplayPlaceholder =
        placeholderValue !== 0 &&
        value === 0 &&
        !interacting;

    // The value that will be used as base for calculating how to render the symbols
    let renderedValue;
    if (shouldDisplayPlaceholder) {
        renderedValue = placeholderValue;
    } else {
        renderedValue = quiet ? value : displayValue;
    }

    // The amount of full symbols
    const fullSymbols = Math.floor(renderedValue);

    for (let i = 0; i < totalSymbols; i++) {
        let percent;
        // Calculate each symbol's fullness percentage
        if (i - fullSymbols < 0) {
            percent = 100;
        } else if (i - fullSymbols === 0) {
            percent = (renderedValue - i) * 100;
        } else {
            percent = 0;
        }

        symbolNodes.push(
            <RatingItem
                key={i}
                index={i}
                readonly={readonly}
                inactiveIcon={empty[i % empty.length]}
                activeIcon={
                    shouldDisplayPlaceholder ? placeholder[i % full.length] : full[i % full.length]
                }
                percent={percent}
                direction={direction}
                {...(!readonly && {
                    onClick: symbolClick,
                    onMouseMove: symbolMouseMove,
                    onTouchMove: symbolMouseMove,
                    onTouchEnd: symbolEnd
                })}
            />
        );
    }

    return (
        <span
            id={id}
            style={{...style, display: 'inline-block', direction}}
            className={className}
            tabIndex={tabIndex}
            aria-label={props['aria-label']}
            {...(!readonly && { onMouseLeave: onMouseLeave })}
        >
        {symbolNodes}
      </span>
    );

}

export {RatingItemList}
