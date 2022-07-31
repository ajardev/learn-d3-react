import { max } from 'd3';

// import { line, curveNatural } from 'd3';
export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  innerHeight
}) => (
  data.map((d, i) => (
    <g key={i} className="marks">
      <rect
        // key={i}
        x={xScale(d.x0) + 0.5}
        y={yScale(yValue(d))}
        width={max([0, xScale(d.x1) - xScale(d.x0) - 1])}
        // width={xScale(xValue(d))}
        height={innerHeight - yScale(yValue(d))}
        // height={innerHeight}
        fill="cornflowerblue"
      />
      <text
        x={xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2}
        y={yScale(yValue(d)) - 5}
        fill="darkgrey"
        style={{textAnchor: "middle"}}
      >
        {yValue(d)}
      </text>
    </g>
  ))
);
