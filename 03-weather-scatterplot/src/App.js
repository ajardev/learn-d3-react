import { scaleLinear, extent } from 'd3';
import { useData } from './hooks/useData';
import { AxisBottom } from './components/AxisBottom';
import { AxisLeft } from './components/AxisLeft';
import { Marks } from './components/Marks';

const App = ({ width, height, margin }) => {
    // Read data with custom hook
    const data = useData();

    if (!data) {
        return <pre>Loading...</pre>;
    }

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create accessor
    const xValue = d => d.dewPoint;
    const yValue = d => d.humidity;
    // 
    const colorValue = d => d.cloudCover
        
    // Create x axis
    const xScale = scaleLinear().domain(extent(data, xValue)) // d3.extent returns an array with the min and max value
          						.range([0, innerWidth])
								.nice();

    // Create y axis
    const yScale = scaleLinear().domain(extent(data, yValue))
                              	.range([innerHeight, 0]) // range refers to highest and lowest numbers to display
								.nice();

	// Create color scale
	const colorScale = scaleLinear().domain(extent(data, colorValue))
									.range(["skyblue", "darkslategrey"])
                                
    return (
    <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
            <AxisBottom 
                xScale={xScale}
                innerHeight={innerHeight}
				innerWidth={innerWidth}
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
				colorScale={colorScale}
                xValue={xValue}
                yValue={yValue}
				colorValue={colorValue}
            />
        </g>
    </svg>
);
}
export default App;