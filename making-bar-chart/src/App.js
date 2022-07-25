import { scaleBand, scaleLinear, max } from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const App = ({ width, height, margin }) => {
    // Read data with custom hook
    const data = useData();

    if (!data) {
        return <pre>Loading...</pre>;
    }

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    // Create accessor
    const yValue = d => d.Country;
    const xValue = d => d.Population;

    // Create y axis
    const yScale = scaleBand().domain(data.map(yValue))
                              .range([0, innerHeight]);
                              
    // Create x axis
    const xScale = scaleLinear().domain([0, max(data, xValue)])
                                .range([0, innerWidth]);

    return (
    <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
            <AxisBottom 
                xScale={xScale}
                innerHeight={innerHeight}
            />
            <Marks 
                data={data}
                xScale={xScale}
                yScale={yScale}
                xValue={xValue}
                yValue={yValue}
            />
            <AxisLeft
                yScale={yScale}
            />
        </g>
    </svg>
);
}
export default App;