import { scaleLinear, bin, max, extent } from 'd3';
import { useData } from './hooks/useData';
import { AxisBottom } from './components/AxisBottom';
import { AxisLeft } from './components/AxisLeft';
import { Marks } from './components/Marks';
import { MeanLine } from './components/MeanLine';

const App = ({ width, height, margin }) => {
    // Read data with custom hook
    const data = useData();

    if (!data) {
        return <pre>Loading...</pre>;
    }

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create accessor
    const xValue = d => d.humidity;
    const yValue = d => d.length;
        
    // Create x axis
    const xScale = scaleLinear().domain(extent(data, xValue)) // d3.extent returns an array with the min and max value
          						.range([0, innerWidth])
								.nice();

    // Create bins generator
    const binsGenerator = bin().domain(xScale.domain())
                               .value(xValue)
                               .thresholds(12);

    // Create bins
    const bins = binsGenerator(data)

    // Create y axis
    const yScale = scaleLinear().domain([0, max(bins, yValue)])
                              	.range([innerHeight, 0]) // range refers to highest and lowest numbers to display
								.nice();

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
                data={bins}
                xScale={xScale}
                yScale={yScale}
                xValue={xValue}
                yValue={yValue}
				innerHeight={innerHeight}
            />
            <MeanLine 
                data={data}
                xValue={xValue}
                xScale={xScale}
				innerHeight={innerHeight}
            />
        </g>
    </svg>
);
}
export default App;