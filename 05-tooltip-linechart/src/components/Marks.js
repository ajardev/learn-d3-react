import { line, curveLinear } from 'd3';
export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue
}) => (
  <g className="marks">
    <path
      fill="none"
      stroke="#af9358"
      strokeWidth={2}
      d={line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
        .curve(curveLinear)(data)}
    />
  </g>
);
