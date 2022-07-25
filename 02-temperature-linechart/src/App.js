import { scaleTime, scaleLinear, min, max, extent, timeParse, timeFormat } from 'd3';
import { useData } from './hooks/useData';
import { AxisBottom } from './components/AxisBottom';
import { AxisLeft } from './components/AxisLeft';
import { Marks } from './components/Marks';
import { FreezingTemp } from './components/FreezingTemp';

const App = ({ width, height, margin }) => {
    // Read data with custom hook
    const data = useData();
    const dateFormatString = "%Y-%m-%d"
    const dateParser = timeParse(dateFormatString)

    if (!data) {
        return <pre>Loading...</pre>;
    }

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create accessor
    const xValue = d => dateParser(d.date);
    const yValue = d => d.temperatureMax;

    const xAxisTickFormat = timeFormat('%B');

    // Create y axis
    const yScale = scaleLinear().domain([min(data, yValue) * 0.75, max(data, yValue)])
                              .range([innerHeight, 0]); // range refers to highest and lowest numbers to display
                              
    // Create x axis
    const xScale = scaleTime().domain(extent(data, xValue)) // d3.extent returns an array with the min and max value
                                .range([0, innerWidth]);
    // xScale.ticks().map(tickValue => (
    //   console.log(tickValue)))
    return (
    <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
            <FreezingTemp 
                yScale={yScale}
                innerHeight={innerHeight}
				innerWidth={innerWidth}
            />
            <AxisBottom 
                xScale={xScale}
                innerHeight={innerHeight}
				innerWidth={innerWidth}
				tickFormat={xAxisTickFormat}
            />
			<AxisLeft
                yScale={yScale}
				innerHeight={innerHeight}
				innerWidth={innerWidth}
            />
            <Marks 
                data={data}
                xScale={xScale}
                yScale={yScale}
                xValue={xValue}
                yValue={yValue}
            />
        </g>
    </svg>
);
}
export default App;