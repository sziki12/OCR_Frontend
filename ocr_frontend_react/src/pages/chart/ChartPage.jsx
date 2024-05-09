import {PieChart} from "@mui/x-charts";
import * as React from 'react';
import {useEffect, useState} from "react";
import {getChartData} from "../../components/utils/BackendAccess";
import {Card, CardContent, CardHeader, Input, Switch, Typography} from "@mui/material";
import getDateToShow from "../../components/utils/Utils";


export default function ChartPage()
{

    let [chartData,setChartData] = useState({
        categoryData:[]
    })
    let [date,setDate] = useState({
        from:new Date(),
        to:new Date()
    })
    let [animationEnabled,setAnimationEnabled] = useState(true)

    const onChange = (e) => {
        const { name, value } = e.target;
        if(name === "to" && date.from<=value ||
        name === "from" &&date.to >=value)
        {
            setDate(prevState => ({
                ...prevState,
                [name]: value
            }));
        }

    }

    useEffect(() => {
        getChartData().then((data)=>{
            setChartData(data)
        })
    }, []);
    return(
        <div className={"flex flex-col"}>
            <div className={"flex flex-row items-center"}>
                <p>From</p>
                <Input
                    className={"text-black px-6"}
                    type="date"
                    placeholder="From"
                    name={"from"}
                    value={getDateToShow(date.from)}
                    onChange={onChange}
                />
                <p>To</p>
                <Input
                    className={"text-black px-6"}
                    type="date"
                    placeholder="To"
                    name={"to"}
                    value={getDateToShow(date.to)}
                    onChange={onChange}
                />
            </div>
            <div className={"flex flex-row items-center"}>
                <Switch defaultChecked onChange={()=>{
                    setAnimationEnabled(!animationEnabled)
                }} />
                <p>Enable Chart Animation</p>

            </div>
            <div className={"flex flex-row"}>
                <Card>
                    <CardContent>
                        <Typography sx={{ fontSize: 18 }} gutterBottom>
                            Item Count by Category
                        </Typography>
                        <PieChart
                            series={[
                                {
                                    data: chartData.categoryData.map((data)=>{return {
                                        id:chartData[data],
                                        value:data.itemCount,
                                        label:data.category
                                    }}),
                                    highlightScope: (animationEnabled)?{ faded: 'global', highlighted: 'item' }:{},
                                    faded: (animationEnabled)?{ innerRadius: 30, additionalRadius: -30, color: 'gray' }:{},
                                },
                            ]}
                            width={400}
                            height={300}
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography sx={{ fontSize: 18 }} gutterBottom>
                            Item Cost by Category
                        </Typography>
                        <PieChart
                            series={[
                                {
                                    data: chartData.categoryData.map((data)=>{return {
                                        id:chartData[data],
                                        value:data.totalCost,
                                        label:data.category
                                    }}),
                                    highlightScope: (animationEnabled)?{ faded: 'global', highlighted: 'item' }:{},
                                    faded: (animationEnabled)?{ innerRadius: 30, additionalRadius: -30, color: 'gray' }:{},
                                },
                            ]}
                            width={400}
                            height={300}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>)
}