import { useEffect, useState } from "react";
import dynamic from 'next/dynamic'; // If you're using Next.js, otherwise use another method for conditional imports
const DynamicChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function BarGraph(props: any) {
    console.log(props)
    const [barVolumeData, setbarVolumeData] = useState([{x:0,y:0}]);
    const [barQunatityData, setbarQuantityData] = useState([{x:0,y:0}]);
    const [data, setData] = useState(props.bardata)
    const[type,setType]=useState(props.type)
   

    useEffect(() => {

        console.log("key",type);
        let result = [];
        if(type=="volume"){
        for (let iter in data) {
            console.log("iter", iter)
            result.push({
                x: Number(data[iter].iteration),
                y: Number(data[iter].total_amount_last_round)

            });
        }
        console.log("bardataresult", result);
        setbarVolumeData(result)
    }else{
        for (let iter in data) {
            console.log("iter", iter)
            result.push({
                x: Number(data[iter].iteration),
                y: Number(data[iter].total_quantity_last_round)

            });
        }
        console.log("bardataresult", result);
        setbarQuantityData(result)
    }
    }, [data,type])

    const chartVolumeOptions:ApexCharts.ApexOptions  = {
        chart: {
            type: 'bar',
            zoom: {
                enabled: true
            }
        },
        xaxis: {
            categories: barVolumeData.map((dataPoint) => dataPoint.x),
        },
        tooltip: {
            enabled: true,
        },

    };

    const chartVolumeSeries = [
        {
            name: 'Volume',
            data: barVolumeData.map((dataPoint) => dataPoint.y),
        },
    ];

    const chartQOptions:ApexCharts.ApexOptions  = {
        chart: {
            type: 'bar',
            zoom: {
                enabled: true
              }
            
        },
        xaxis: {
            categories: barQunatityData.map((dataPoint) => dataPoint.x),
        },
        colors: ["#00FF00"]

    };

    const chartQSeries = [
        {
            name: 'Quantity',
            data: barQunatityData.map((dataPoint) => dataPoint.y),
        },
    ];

    return (

        <>
        {
            type== "volume" && <div>
                <DynamicChart
                    options={chartVolumeOptions}
                    series={chartVolumeSeries}
                    type="bar"
                    height={350}
                />
            </div>
        
        }

{
            type== "quantity" && <div>
                <DynamicChart
                    options={chartQOptions}
                    series={chartQSeries}
                    type="bar"
                    height={350}
                />

            </div>
        
        }
        </>
    )
}