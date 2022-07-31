import { mean } from 'd3';

export const MeanLine = ({
    data,
    xValue,
    xScale,
    innerHeight
}) => {
    const rerata = mean(data, xValue)

    return (
        <>
            <line
                x1={xScale(rerata)}
                x2={xScale(rerata)}
                y1={25}
                y2={innerHeight}
                stroke="maroon"
                strokeDasharray="2px 4px"
            >
            </line>
            <text
                x={xScale(rerata)}
                y={15}
                fill="maroon"
                textAnchor="middle"
            >
                mean
            </text>
        </>
    )
}