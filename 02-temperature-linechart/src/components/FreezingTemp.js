export const FreezingTemp = ({
    yScale,
    innerHeight,
    innerWidth
}) => (
        <rect 
            key={0}
            x={0}
            y={yScale(32)}
            height={innerHeight - yScale(32)}
            width={innerWidth}
            fill="#e0f3f3"
        />
);