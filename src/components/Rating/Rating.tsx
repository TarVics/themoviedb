import React, {CSSProperties, FC, useEffect, useState} from 'react';

import css from "./Rating.module.css";
import {IRatingIconType, RatingItemList} from ".";

interface IProps {
  start?: number,
  stop?: number,
  step?: number,
  initialRating?: number,
  placeholderRating?: number,
  readonly?: boolean,
  quiet?: boolean,
  fractions?: number,
  direction?: CanvasDirection,
  emptySymbol?: IRatingIconType | IRatingIconType[],
  fullSymbol?: IRatingIconType | IRatingIconType[],
  placeholderSymbol?: IRatingIconType | IRatingIconType[],
  onHover?: (value: number) => void,
  onClick?: (value: number) => void,
  onChange?: (value?: number) => void
  'aria-label'?: string,
  tabIndex?: number,
  style?: CSSProperties,
  className?: string,
  id?: string
}

const defaultProps: IProps = {
  start: 0,
  stop: 5,
  step: 1,
  initialRating: 0,
  readonly: false,
  quiet: false,
  fractions: 1,
  direction: 'ltr',
  onHover: () => {},
  onClick: () => {},
  onChange: () => {},
  emptySymbol: css.empty,
  fullSymbol: css.full,
  placeholderSymbol: css.placeholder
}

const Rating: FC<IProps> = (props) => {
  const [state, setState] = useState(() => ({ ...defaultProps, ...props }));

  useEffect(() => {
    setState({ ...defaultProps, ...props });
  }, [props]);

  const translateValueToDisplayValue = (value?: number) => {
    if (state.initialRating === undefined) {
      return 0;
    }
    return ((value || 0) - (state.start || 0)) / (state.step || 1);
  }

  const translateDisplayValueToValue = (displayValue: number) => {
    const translatedValue = displayValue * (state.step || 0) + (state.start || 0);
    // minimum value cannot be equal to start, since it's exclusive
    return translatedValue === state.start
        ? translatedValue + 1 / (state.fractions || 1)
        : translatedValue;
  }

  const handleClick = (value: number) => {
    const newValue = translateDisplayValueToValue(value);
    state.onClick && state.onClick(newValue);
    // Avoid calling setState if not necessary. Micro optimisation.
    if (state.initialRating !== newValue) {
      // If we have a new value trigger onChange callback.
      setState(prev => ({ ...prev, initialRating: newValue }));
    }
  }

  useEffect(() => {
    state.onChange && state.onChange(state.initialRating);
  }, [state])

  const handleHover = (displayValue: number) => {
    const value = displayValue === undefined
      ? displayValue
      : translateDisplayValueToValue(displayValue);
    state.onHover && state.onHover(value);
  }

  const {
    step,
    emptySymbol,
    initialRating,
    fullSymbol,
    placeholderSymbol,
    placeholderRating,
    readonly,
    quiet,
    fractions,
    direction,
    start,
    stop,
    id,
    className,
    style,
    tabIndex
  } = state;

  function calculateTotalSymbols(start?: number, stop?: number, step?: number) {
    return Math.floor(((stop || 5) - (start || 0)) / (step || 1));
  }

  return (
      <RatingItemList
        id={id}
        style={style}
        className={className}
        tabIndex={tabIndex}
        aria-label={props['aria-label']}
        totalSymbols={calculateTotalSymbols(start, stop, step)}
        value={translateValueToDisplayValue(initialRating)}
        placeholderValue={translateValueToDisplayValue(placeholderRating)}
        readonly={readonly}
        quiet={quiet}
        fractions={fractions}
        direction={direction}
        emptySymbol={emptySymbol}
        fullSymbol={fullSymbol}
        placeholderSymbol={placeholderSymbol}
        onClick={handleClick}
        onHover={handleHover}
      />
  )
}

export {Rating}
