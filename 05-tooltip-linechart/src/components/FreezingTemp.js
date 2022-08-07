export const FreezingTemp = ({
    yScale,
    innerHeight,
    innerWidth
}) => (
        <rect 
            key={0}
            x={0}
            y={yScale(60)}
            height={innerHeight - yScale(60)}
            width={innerWidth}
            fill="#e0f3f3"
        />
);