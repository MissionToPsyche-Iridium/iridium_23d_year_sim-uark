import React from 'react';

interface DiamondStarProps {
  centerX: number;
  centerY: number;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}

interface CircleStarProps {
  centerX: number;
  centerY: number;
  radius: number;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const CircleStar: React.FC<CircleStarProps> = ({
  centerX,
  centerY,
  radius,
  className,
  onClick,
  style,
}) => (
  <circle
    className={className}
    style={style}
    cx={centerX}
    cy={centerY}
    r={radius}
    fill="white"
    onClick={onClick}
  />
);

const DiamondStar: React.FC<DiamondStarProps> = ({
  centerX,
  centerY,
  width,
  height,
  className,
  style,
}) => {
  const points = [
    [centerX, centerY - height / 2],
    [centerX + width / 2, centerY],
    [centerX, centerY + height / 2],
    [centerX - width / 2, centerY],
  ]
    .map((p) => p.join(','))
    .join(' ');

  return (
    <polygon
      className={className}
      style={style}
      points={points}
      fill="white"
    />
  );
};

export { CircleStar, DiamondStar };