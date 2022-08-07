export const AxisBottom = ({ xScale, innerHeight, innerWidth, tickFormat }) => (
    <g className="x-axis" transform={`translate(0, ${innerHeight})`}>
        <path
            className="domain"
            d={`M 0 6 V 0 H ${innerWidth} V 6`}
            fill="none"
            stroke="currentColor"
        />
        {xScale.ticks().map(tickValue => (
            <g 
                className="tick"
                key={tickValue}
                transform={`translate(${xScale(tickValue)}, 0)`}
            >
                <line y2="6" stroke="black" />
                <text style={{ textAnchor: 'middle' }} dy=".71em" y="9">
                    {tickFormat(tickValue)}
                </text>
            </g>
        ))}
    </g>
);