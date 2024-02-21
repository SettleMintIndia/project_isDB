import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic'; // If you're using Next.js, otherwise use another method for conditional imports
const DynamicChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import Data from '../components/layout/data/chatdata.json'

const chart = () => {

    const [candlestickData, setCandleStickData] = useState(Data)
    const [series, setSeries] = useState([])
    const [currentView, setCurrentView] = useState('');
    const [iteration, setIteration] = useState('')
    const [resetData, setResetData] = useState([])


    const handleZoom = (chartContext: any, { xaxis, yaxis }) => {
        setOptions({
            ...options,
            xaxis: {
                ...options.xaxis,
                min: xaxis.min,
                max: xaxis.max,
            },
        });

    };
    const handleBeforeZoom = (event, chartContext, config) => {
        // Prevent the default zooming behavior
        // event.preventDefault();

        console.log(event);

        // Custom logic for left or right scrolling
        const currentMin = options.xaxis.min;
        const currentMax = options.xaxis.max;
        const range = currentMax - currentMin;

        if (event.type === 'scrollLeft') {
            const newMin = currentMin - range * 0.2; // Adjust the scrolling percentage as needed
            const newMax = currentMax - range * 0.2;
            setOptions({
                ...options,
                xaxis: {
                    ...options.xaxis,
                    min: newMin,
                    max: newMax,
                },
            });
        } else if (event.type === 'scrollRight') {
            const newMin = currentMin + range * 0.2;
            const newMax = currentMax + range * 0.2;
            setOptions({
                ...options,
                xaxis: {
                    ...options.xaxis,
                    min: newMin,
                    max: newMax,
                },
            });
        }
    };



    /* const handleDataPointSelection = (event, chartContext, config) => {
      const selectedCandle = config.w.config.series[0].data[config.dataPointIndex];
      // Access the selected candle data and perform custom zoom logic if needed
      console.log('Selected Candle:', selectedCandle, selectedCandle.rounds);
      }; */

    const options = {
        chart: {
            type: 'candlestick',
            zoom: {
                enabled: true, // Enable zooming
                type: 'x', // Zoom only on the x-axis
                autoScaleYaxis: true // Automatically scale the y-axis when zooming
            },

            events: {
                zoomed: handleZoom,
                beforeZoom: handleBeforeZoom,

                dataPointSelection: (event, chartContext, config) => {
                    //  console.log(config.w.config.series[0].data[config.dataPointIndex].rounds);
                    let x_rounds = config.w.config.series[0].data[config.dataPointIndex]
                    let seriesData: any = [{ data: x_rounds.rounds }]
                    console.log(config.w.config.series[0].data);
                    setCurrentView("Rounds")
                    setTimeout(() => {
                        setIteration(x_rounds.x)
                        setSeries(seriesData);


                    }, 1000);
                    console.log("options", options)
                }
            }

        },
        xaxis: {
            type: 'numeric',
            min: 0, // Initial min value
            max: 10, // Initial max value



        },



    };


    const [optionsData, setOptions] = useState(options)


    useEffect(() => {

        var formattedData: any = [];
        // Loop through the JSON data and format it
        candlestickData.forEach(item => {
            const iteration = item.Iteration;
            const price = item.Price;

            // If there is no entry for the iteration yet, create one
            if (formattedData.length <= iteration) {
                formattedData.push({ x: iteration, y: [price, price, price, price] });
            } else {
                // [O, H, L, C]
                // Update the existing entry for the iteration
                const entry = formattedData[iteration].y;
                entry[0] = entry[0]; //open---first value
                entry[1] = Math.max(entry[1], price); // high -max calue
                entry[2] = Math.min(entry[0], price); //low -min value
                entry[3] = price; // Update last value --close
            }
        });

        const groupedData = candlestickData.reduce((acc: any, obj) => {
            const key = `${obj.Iteration}-${obj.Rounds}`;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});
        var dataround: any[] = []

        // Calculate first, max, min, and last values for each group
        Object.keys(groupedData).map((key) => {
            const data = groupedData[key];
            //console.log(data);
            const firstValue = data[0].Price;
            const max = Math.max(...data.map((item: any) => item.Price));
            const min = Math.min(...data.map((item: any) => item.Price));
            const lastValue = data[data.length - 1].Price;
            const round = key.split("-");
            let datar = {
                iteration: round[0],
                round: Number(round[1]),
                datakey: [firstValue, max, min, lastValue]
            }
            dataround.push(datar)
        });


        // setRoundData(dataround);
        //setChartData

        //console.log (dataround)
        const groupedDatas = dataround.reduce((result, item) => {
            const existingGroup = result.find(group => group.iteration === item.iteration);

            if (existingGroup) {
                // If a group with the same 'i' value exists, add the current item to its 'values' array
                existingGroup.rounds.push({ x: item.round, y: item.datakey });
            } else {
                // If no group with the same 'i' value exists, create a new group
                result.push({ iteration: item.iteration, rounds: [{ x: item.round, y: item.datakey }] });
            }

            return result;
        }, []);



        const mergedData = formattedData.map(item2 => {

            const matchingItem1 = groupedDatas.find(item1 => item1.iteration == item2.x);
            if (matchingItem1) {
                // If a match is found, merge the data
                return { x: item2.x, y: item2.y, rounds: matchingItem1.rounds };
            } else {
                // If no match is found, you can handle it differently or skip it
                return null;
            }
        }).filter(item => item !== null);

        console.log("mergedData", mergedData);





        // Output the formatted data

        let series: any = [
            {
                data: mergedData
            }

        ]

        // console.log("series",series);
        setSeries(series);
        setResetData(series)


        //console.log("dataseries", dataseries)
    }, [candlestickData]);


    console.log("series", series)

    const hadleResetData = () => {
        console.log(resetData);
        setSeries(resetData);
        setCurrentView('');
        setIteration('')

    }
    const handleScrollLeft = () => {
        // Trigger left scrolling
        handleBeforeZoom({ type: 'scrollLeft' });
    };

    const handleScrollRight = () => {
        // Trigger right scrolling
        handleBeforeZoom({ type: 'scrollRight' });
    };

    return (
        <>
            <div className="template">


                <h1>Candle Stick Graph</h1>
                <p className='iteratioview'>Iteration-{iteration} {currentView}</p>


                {iteration != '' && <button className="iterationbutton" onClick={() => hadleResetData()}>Back</button>}


                <DynamicChart options={optionsData} series={series} type="candlestick" height={350} />

                <button className="scrollbutton" onClick={handleScrollLeft}>Scroll Left</button>
                <button  className="scrollbutton" onClick={handleScrollRight}>Scroll Right</button>
            </div>
        </>
    );
};

export default chart;
