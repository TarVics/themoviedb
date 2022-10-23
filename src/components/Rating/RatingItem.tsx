import React, {CSSProperties, FC} from 'react';

export type IRatingIconType = string | CSSProperties | React.ReactNode;
export type IRatingEventHandler = (value: number, e: React.SyntheticEvent) => void;

export interface IRatingItemProps {
  index: number,
  readonly?: boolean,
  inactiveIcon: IRatingIconType,
  activeIcon: IRatingIconType,
  percent: number,
  direction?: CanvasDirection,
  onClick?: IRatingEventHandler,
  onMouseMove?: IRatingEventHandler,
  onTouchMove?: IRatingEventHandler,
  onTouchEnd?: IRatingEventHandler,
}

// Return the corresponding React node for an icon.
const _iconNode = (icon: IRatingIconType) => {
  // If it is already a React Element just return it.
  if (React.isValidElement(icon)) {
    return icon;
  }

  // If it is a string, use it as class names.
  if (typeof icon === 'string') {
    return <span className={icon as string} />;
  }

  // If it is an object, try to use it as a CSS style object.
  if (typeof icon === 'object' && icon !== null) {
    return <span style={icon as CSSProperties} />;
  }
};

const RatingItem: FC<IRatingItemProps> = (
  {
    index,
    readonly,
    inactiveIcon,
    activeIcon,
    percent,
    direction,
    onClick,
    onMouseMove,
    onTouchMove,
    onTouchEnd
  }
) => {

  const backgroundNode = _iconNode(inactiveIcon);
  const showBgIcon = percent < 100;
  const bgIconContainerStyle: CSSProperties = showBgIcon ? {} : { visibility: 'hidden' };
  const iconNode = _iconNode(activeIcon);

  const iconContainerStyle: CSSProperties = {
    display: 'inline-block',
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    [direction === 'rtl' ? 'right' : 'left']: 0,
    width: `${percent}%`
  }

  const style: CSSProperties = {
    cursor: !readonly ? 'pointer' : 'inherit',
    display: 'inline-block',
    position: 'relative'
  };

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (onMouseMove) {
      onMouseMove(index, e);
    }
  }

  function handleMouseClick(e: React.MouseEvent<HTMLElement>) {
    if (onClick) {
      // [Supporting both TouchEvent and MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent)
      // We must prevent firing click event twice on touch devices.
      e.preventDefault();
      onClick(index, e);
    }
  }

  function handleTouchMove(e: React.TouchEvent<HTMLElement>) {
    if (onTouchMove) {
      onTouchMove(index, e);
    }
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLElement>) {
    if (onTouchEnd) {
      onTouchEnd(index, e);
    }
  }

  return (
    <span
      style={style}
      onClick={handleMouseClick}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <span style={bgIconContainerStyle}>
        {backgroundNode}
      </span>
      <span style={iconContainerStyle}>
        {iconNode}
      </span>
    </span>
  )
}

export {RatingItem}
