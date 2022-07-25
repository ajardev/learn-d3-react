import { useState, useEffect } from 'react';
import { json } from 'd3';

const jsonUrl = 'https://raw.githubusercontent.com/TheRobBrennan/explore-data-visualization-with-D3/master/examples/data/seattle_wa_weather_data.json';

export const useData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        json(jsonUrl).then(data => {
            setData(data);
        });
    }, []);

    return data;
};