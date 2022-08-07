import { scaleTime, scaleLinear, min, max, extent, timeParse, timeFormat, format, scan } from 'd3';
import { useData } from './hooks/useData';
import { AxisBottom } from './components/AxisBottom';
import { AxisLeft } from './components/AxisLeft';
import { Marks } from './components/Marks';
import { FreezingTemp } from './components/FreezingTemp';
import { Tooltip } from './components/Tooltip';
import { useState, useCallback } from 'react';

const App = ({ width, height, margin }) => {
    const initialMousePosition = { x: null, y: null }
    const [mousePosition, setMousePosition] = useState(initialMousePosition);
    const handleMouseMove = useCallback(event => {
        const { clientX, clientY } = event;
        setMousePosition({ x: clientX, y: clientY });
    }, [setMousePosition]);

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

    const xAxisTickFormat = timeFormat('%B %d');

    // Create y axis
    const yScale = scaleLinear().domain([min(data, yValue) * 0.75, max(data, yValue)])
                              .range([innerHeight, 0]); // range refers to highest and lowest numbers to display
                              
    // Create x axis
    const xScale = scaleTime().domain(extent(data, xValue)) // d3.extent returns an array with the min and max value
                                .range([0, innerWidth]);

    // We can use the .invert() method of xScale() to convert our units backward - from the range to the domain,
    // instead of from the domain to the range (default)
    const hoveredDate = xScale.invert(mousePosition.x - margin.left)

    // Find the distance between the hovered point and a datapoint
    // use the absolute value since we don't care if the point is before or after the hovered date
    const getDistanceFromHoveredDate = d => Math.abs(xValue(d) - hoveredDate)

    // Use .scan() to get the index of the closest data point to our hovered date
    const closestIndex = scan(data, (a, b) => (getDistanceFromHoveredDate(a) - getDistanceFromHoveredDate(b)))
    const closestDataPoint = data[closestIndex]
    const closestXValue = xValue(closestDataPoint)
    const closestYValue = yValue(closestDataPoint)

    const xTooltipFormat = timeFormat('%A, %B %d, %Y')
    const yTooltipFormat = format('.1f')

    // Grab the x,y position of our closest point
    const xPos = xScale(closestXValue) + margin.left
    const yPos = yScale(closestYValue) + margin.top

    console.log(xPos)
    console.log(mousePosition.x)

    // const xValue = d => dateParser(d.date);

    return (
    <div className='line-chart' onMouseMove={handleMouseMove}>
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
        <Tooltip
            closestXValue={closestXValue}
            closestYValue={closestYValue}
            xPos={xPos}
            yPos={yPos}
            xTooltipFormat={xTooltipFormat}
            yTooltipFormat={yTooltipFormat}
        />
    </div>
);
}
export default App;