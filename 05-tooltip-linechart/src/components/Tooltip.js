export const Tooltip = ({ closestXValue, closestYValue, xPos, yPos, xTooltipFormat, yTooltipFormat }) => {
    

    return (
        <div
            className="tooltip"
            style={{transform: `translate(calc(-50% + ${xPos}px), calc(-100% + ${yPos}px))`}}
        >
            <div className="tooltip-date">
                <span id="date">{xTooltipFormat(closestXValue)}</span>
            </div>
            <div className="tooltip-temperature">
                Maximum Temperature: <span id="temperature">{yTooltipFormat(closestYValue)}°F</span>
            </div>
        </div>
    )
}