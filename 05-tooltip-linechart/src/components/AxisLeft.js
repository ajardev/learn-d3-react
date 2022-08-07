export const AxisLeft = ({ yScale, innerHeight, innerWidth }) => (
    <g className="y-axis">
        <path
            className="domain"
            d={`M -6 ${innerHeight} H 0 V 0 H -6`}
            fill="none"
            stroke="currentColor"
        />
        {yScale.ticks().map(tickValue => (
            <g
                className="tick"
                key={tickValue}
                transform={`translate(0,${yScale(tickValue)})`}
            >
                <line x2="-6" stroke="black" />
                <text
                    style={{ textAnchor: 'end' }}
                    x={-9}
                    dy=".32em"
                >
                    {tickValue}
                </text>
            </g>
        ))}
    </g>
) 