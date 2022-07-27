// import { line, curveNatural } from 'd3';
export const Marks = ({
  data,
  xScale,
  yScale,
  colorScale,
  xValue,
  yValue,
  colorValue
}) => (
  data.map((d, i) => (
    <g key={i} className="marks">
      <circle
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        fill={colorScale(colorValue(d))}
        r={5}
      />
    </g>
  ))
);
