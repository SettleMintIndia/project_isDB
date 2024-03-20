import { useEffect, useState } from "react";
import dynamic from 'next/dynamic'; // If you're using Next.js, otherwise use another method for conditional imports
const DynamicChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import Image from 'next/image';

export default function CandleStickSimulation(props: any) {
    console.log(props)

    const [candlestickData, setCandleStickData] = useState([])

    const [iterationData, setIterationData] = useState(props.iteration)
    const [roundData, setRoundData] = useState(props.round)

    const [currentView, setCurrentView] = useState('');
    const [iteration, setIteration] = useState('');
    const [resetData, setResetData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [Siterations, setSIterations] = useState(props.noofiterations)
    const [Srounds, setSRounds] = useState(props.noofrounds)

    const [visibleRange, setVisibleRange] = useState({
        min: 0,
        max: props.noofiterations,

    });

    const [options, setOptions] = useState({
        chart: {
            type: 'candlestick',
            id: 'candlestick-chart',
            toolbar: {
                show: false,
                tools: {
                    download: false,
                },
            },

            events: {
                dataPointSelection: (event:any, chartContext:any, config:any) => {
                    //  console.log(config.w.config.series[0].data[config.dataPointIndex].rounds);
                    console.log(roundData, config.w.config.series[0].data[config.dataPointIndex]);
                    const filteredArray = roundData.filter((item:any) => item.iteration === config.w.config.series[0].data[config.dataPointIndex].x);
                    console.log("filteredArray", filteredArray)

                    let round_result = [];
                    for (let iter in filteredArray) {
                        console.log("iter", iter)
                        round_result.push({
                            x: Number(filteredArray[iter].round),
                            y: [Number(filteredArray[iter].opening_price), Number(filteredArray[iter].max_price),
                            Number(filteredArray[iter].min_price), Number(filteredArray[iter].closing_price)]
                        });
                    }
                    console.log("candleresultrounds", round_result);

                    let seriesData: any = [{ data: round_result }]
                    setCurrentView("Rounds")
                    setTimeout(() => {
                        setIteration(config.w.config.series[0].data[config.dataPointIndex].x)
                        setSeries(seriesData);

                        setOptions({
                            ...options,
                            xaxis: {
                                ...options.xaxis,
                                min: 0,
                                max: Srounds,
                            },
                        });

                        setVisibleRange((prevRange) => ({
                            min: 0,
                            max: Srounds,
                        }));
                    }, 1000);
                    console.log("options", options)
                }
            }
        },
        xaxis: {
            type: 'numeric',
            labels: {
                show: true,
            },
            min: visibleRange.min,
            max: visibleRange.max,
            // Set the initial visible x-axis range
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
            //tickAmount: 20,
            labels: {
                formatter: function (value:any) {
                    // Round to 2 decimals
                    return value.toFixed(2);
                },
            },

        },
        zoom: {
            enabled: true,
            type: 'x', // Enable zooming along the x-axis
            autoScaleYaxis: true, // Auto scale the y-axis based on the visible data
        },
        pan: {
            enabled: true,
            type: 'x', // Enable panning along the x-axis
            rangeMin: undefined,
            rangeMax: undefined,
        },
    });

    const [series, setSeries] = useState([]);

    useEffect(() => {
        console.log(iterationData, roundData)
        let result = [];
        for (let iter in iterationData) {
            console.log("iter", iter)
            result.push({
                x: Number(iterationData[iter].iteration),
                y: [Number(iterationData[iter].opening_price), Number(iterationData[iter].max_price),
                Number(iterationData[iter].min_price), Number(iterationData[iter].closing_price)]
            });
        }
        console.log("candleresult", result);

        let series: any = [
            {
                data: result
            }
        ]

        console.log("series", series);
        setSeries(series);
        setResetData(series)


    }, [iterationData, roundData])
    const handleZoomIn = () => {
        console.log(currentView);
        let x = currentView == 'Rounds' ? Srounds : Siterations;
        //let x = currentView == 'Rounds' ? 4000 : 80
        console.log(x)
        // Implement logic to zoom in, adjusting the visible x-axis range
        const currentRange = options.xaxis.max - options.xaxis.min;
        const newMin = Math.max(options.xaxis.min + currentRange * 0.1, 0); // Zoom in by 10%
        const newMax = Math.min(options.xaxis.max - currentRange * 0.1, x); // Zoom in by 10%

        setOptions({
            ...options,
            xaxis: {
                ...options.xaxis,
                min: newMin,
                max: newMax,
            },
        });
    };

    const handleZoomOut = () => {
        // Implement logic to zoom out, adjusting the visible x-axis range
        const currentRange = options.xaxis.max - options.xaxis.min;
        let x = currentView == 'Rounds' ? Srounds : Siterations;
        //let x = currentView == 'Rounds' ? 4000 : 80;
        console.log(x)
        const newMin = Math.max(options.xaxis.min - currentRange * 0.1, 0); // Zoom out by 10%
        const newMax = Math.min(options.xaxis.max + currentRange * 0.1, x); // Zoom out by 10%

        setOptions({
            ...options,
            xaxis: {
                ...options.xaxis,
                min: newMin,
                max: newMax,
            },
        });
    };

    const handleScrollLeft = () => {
        // Implement logic to scroll left, adjusting the visible x-axis range
        const currentRange = options.xaxis.max - options.xaxis.min;
        let x = currentView == 'Rounds' ? Srounds : Siterations;
        //let x = currentView == 'Rounds' ? 4000 : 80;
        console.log(x)

        const newMin = Math.max(options.xaxis.min - currentRange * 0.1, 0);
        const newMax = Math.min(options.xaxis.max - currentRange * 0.1, x);

        setOptions({
            ...options,
            xaxis: {
                ...options.xaxis,
                min: newMin,
                max: newMax,
            },
        });
    };

    const handleScrollRight = () => {
        // Implement logic to scroll right, adjusting the visible x-axis range
        const currentRange = options.xaxis.max - options.xaxis.min;
        let x = currentView == 'Rounds' ? Srounds : Siterations;
        //let x = currentView == 'Rounds' ? 4000 : 80;
        console.log(x)
        const newMin = Math.max(options.xaxis.min + currentRange * 0.1, 0);
        const newMax = Math.min(options.xaxis.max + currentRange * 0.1, x);

        setOptions({
            ...options,
            xaxis: {
                ...options.xaxis,
                min: newMin,
                max: newMax,
            },
        });
    };

    const hadleResetData = () => {
        setOptions({
            ...options,
            xaxis: {
                ...options.xaxis,
                min: 0,
                max: Siterations,
            },
        });

        setVisibleRange((prevRange) => ({
            min: 0,
            max: Siterations,
        }));
        console.log(resetData);
        setSeries(resetData);
        setCurrentView('');
        setIteration('')

    }

    return (

        <div>

            {iteration != '' && <button className="iterationbutton" onClick={() => hadleResetData()}>Back</button>}

            <DynamicChart options={options} series={series} type="candlestick" height={400} />
            <div className="button-container">
                <button className='buttongrid' onClick={handleZoomIn}>  <img src="imgs/plus.png" alt="" className='imggrid'
                /></button>
                <button className='buttongrid' onClick={handleZoomOut}> <img src="imgs/minus.png" alt="" className='imggrid'
                /></button>
                <button className='buttongrid' onClick={handleScrollLeft}> <img src="imgs/left-arrow.png" alt="" className='imggrid'
                /></button>
                <button className='buttongrid' onClick={handleScrollRight}> <img src="imgs/right-arrow.png" alt="" className='imggrid'
                /></button>
            </div>

        </div>
    )
}